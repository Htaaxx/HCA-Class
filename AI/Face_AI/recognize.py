import pickle
import torch
from facenet_pytorch import InceptionResnetV1, MTCNN
from torchvision import transforms
from PIL import Image

# Function to load the face database
def load_face_database(database_file):
    """
    Load a face database from a pickle file.
    
    Args:
        database_file (str): Path to the database file (e.g., "face_database.pkl").
        
    Returns:
        dict: A dictionary where keys are names (str) and values are face embeddings (torch.Tensor).
    """
    try:
        with open(database_file, "rb") as f:
            database = pickle.load(f)
        
        # Verify database contents
        if not isinstance(database, dict):
            raise ValueError("Database file does not contain a valid dictionary.")
        
        # Ensure all embeddings are tensors
        for name, embedding in database.items():
            if not isinstance(embedding, torch.Tensor):
                raise ValueError(f"Embedding for {name} is not a torch.Tensor.")
        
        print(f"Successfully loaded database from {database_file}.")
        return database
    except Exception as e:
        print(f"Error loading database: {e}")
        return None

# Initialize pretrained models
mtcnn = MTCNN(image_size=160, margin=10)  # For face detection
model = InceptionResnetV1(pretrained='vggface2', classify=False).eval()  # Pretrained FaceNet model

# Function to detect faces in an image
def detect_faces(image_path):
    image = Image.open(image_path)
    boxes, _ = mtcnn.detect(image)  # Detect faces
    return boxes, image

# Function to extract and preprocess detected faces
def extract_faces(image, boxes):
    faces = []
    for box in boxes:
        x1, y1, x2, y2 = map(int, box)  # Get face bounding box coordinates
        face = image.crop((x1, y1, x2, y2))  # Crop the face region
        face = transforms.ToTensor()(face)  # Convert face to tensor
        face = transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])(face)  # Normalize
        faces.append(face)
    return faces

# Function to generate embeddings for the extracted faces
def get_embeddings_for_faces(faces, model):
    embeddings = []
    for face in faces:
        face_tensor = face.unsqueeze(0)  # Add batch dimension
        with torch.no_grad():
            embedding = model(face_tensor).squeeze(0)  # Get embedding and remove batch dimension
        embeddings.append(embedding)
    return embeddings

# Function to recognize faces in an image
def recognize_faces_in_image(image_path, model, database, threshold=0.6):
    boxes, image = detect_faces(image_path)
    if boxes is None or len(boxes) == 0:
        return "No faces detected"

    # Extract faces and generate embeddings
    faces = extract_faces(image, boxes)
    embeddings = get_embeddings_for_faces(faces, model)
    
    results = []
    for i, embedding in enumerate(embeddings):
        best_match = None
        best_score = float("inf")  # Lower is better for Euclidean distance

        # Compare embedding with the database
        for name, db_embedding in database.items():
            score = torch.dist(embedding, db_embedding).item()  # Compute Euclidean distance
            if score < best_score:
                best_match = name
                best_score = score

        # Decide if the face matches a database entry
        if best_score < threshold:
            results.append((f"Face {i+1}", best_match, best_score))
        else:
            results.append((f"Face {i+1}", "Unknown", best_score))
    return results

# Example usage
if __name__ == "__main__":
    # Load the database from a file
    database_file = "face_database.pkl"
    database = load_face_database(database_file)

    if database:
        # Recognize faces in an image
        image_path = "group.jpg"  # Replace with the path to your image
        results = recognize_faces_in_image(image_path, model, database)

        # Print results
        if isinstance(results, str):  # No faces detected
            print(results)
        else:
            for result in results:
                face, name, score = result
                print(f"{face}: Recognized as {name} (Score: {score})")
