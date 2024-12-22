import os
from facenet_pytorch import InceptionResnetV1, MTCNN
from PIL import Image
import torch
from torchvision import transforms
import pickle

# Initialize models
mtcnn = MTCNN(image_size=160, margin=10)  # Face detector
model = InceptionResnetV1(pretrained='vggface2', classify=False).eval()  # Face embedding model

# Preprocessing transformation
preprocess = transforms.Compose([
    transforms.Resize((160, 160)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
])

# Function to extract embeddings
def get_embedding(image_path):
    image = Image.open(image_path)
    face = mtcnn(image)  # Detect and align face
    if face is not None:
        with torch.no_grad():
            embedding = model(face.unsqueeze(0))  # Get embedding
        return embedding.squeeze(0)  # Remove batch dimension
    else:
        return None

# Build the database
def build_database(image_folder, output_file):
    database = {}
    
    # Iterate over all images in the folder
    for filename in os.listdir(image_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(image_folder, filename)
            label = os.path.splitext(filename)[0]  # Use filename (without extension) as label
            
            print(f"Processing {filename}...")
            embedding = get_embedding(image_path)
            
            if embedding is not None:
                database[label] = embedding
            else:
                print(f"Warning: No face detected in {filename}")
    
    # Save the database as a pickle file
    with open(output_file, 'wb') as f:
        pickle.dump(database, f)
    print(f"Database saved to {output_file}")

# Print current working directory
print(os.getcwd())

# Example usage
build_database("db_img", "face_database.pkl")
