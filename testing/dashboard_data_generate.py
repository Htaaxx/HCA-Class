import random
from datetime import datetime, timedelta
from faker import Faker
from pymongo import MongoClient

# Initialize Faker for generating random names and emails
fake = Faker()

# MongoDB setup
MONGODB_URI = "mongodb+srv://admin:nimda@accountdb.sfso3.mongodb.net/?retryWrites=true&w=majority&appName=AccountDB"
client = MongoClient(MONGODB_URI)
db = client["AccountDB"]  # Database name from your URI

# Collections for the schemas
attendance_collection = db["Attendance"]
temperature_collection = db["Temperature"]
users_collection = db["Users"]

# Function to generate random users
def generate_users(num_users=10):
    users = []
    for _ in range(num_users):
        user = {
            "firstName": fake.first_name(),
            "lastName": fake.last_name(),
            "email": fake.unique.email(),
            "password": fake.password(),
            "createdAt": datetime.now(),
            "updatedAt": datetime.now(),
        }
        users.append(user)
    users_collection.insert_many(users)
    print(f"Generated {num_users} users.")

# Function to generate attendance data
def generate_attendance(date, user_ids):
    num_attendees = random.randint(0, len(user_ids))
    attendees = random.sample(user_ids, num_attendees)
    attendance = {
        "date": date,
        "attendees": attendees,
    }
    attendance_collection.insert_one(attendance)
    print(f"Generated attendance for {date.date()} with {num_attendees} attendees.")

# Function to generate temperature data
def generate_temperature_data(date, num_entries=24):
    records = []
    for hour in range(num_entries):
        timestamp = date + timedelta(hours=hour)
        temp_record = {
            "timestamp": timestamp,
            "currentTemperature": round(random.uniform(15.0, 30.0), 1),  # Random temp in °C
            "currentHumidity": round(random.uniform(30.0, 70.0), 1),  # Random humidity in %
        }
        records.append(temp_record)
    temperature_collection.insert_many(records)
    print(f"Generated {num_entries} temperature records for {date.date()}.")

# Main function to generate data for a specified number of days
def generate_daily_data(start_date, days=7):
    # Create users if the collection is empty
    if users_collection.count_documents({}) == 0:
        generate_users(20)

    user_ids = [user["_id"] for user in users_collection.find()]

    for day in range(days):
        date = start_date + timedelta(days=day)
        date = datetime(date.year, date.month, date.day)  # Ensure date consistency
        generate_attendance(date, user_ids)
        generate_temperature_data(date)

# Generate data for the past 7 days
if __name__ == "__main__":
    start_date = datetime.now() - timedelta(days=6)  # Start 6 days ago
    generate_daily_data(start_date, days=7)
