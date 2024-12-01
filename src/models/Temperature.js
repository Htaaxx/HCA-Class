import mongoose from "mongoose";

// Define the Temperature Schema
const temperatureSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the current time for each record
  },
  currentTemperature: {
    type: Number,
    required: true, // Temperature reading in Celsius
  },
  currentHumidity: {
    type: Number,
    required: true, // Humidity reading as a percentage
  },
});

// Create the Temperature Model
const Temperature = mongoose.model("Temperature", temperatureSchema);

// Function to Save Current Temperature Data
export async function saveTemperatureData(temp, humidity) {
  try {
    const record = new Temperature({
      currentTemperature: temp,
      currentHumidity: humidity,
    });
    await record.save();
    console.log("Temperature data saved:", record);
    return record;
  } catch (error) {
    console.error("Error saving temperature data:", error);
    throw error;
  }
}

// Function to Retrieve Daily Temperature History
export async function getDailyTemperatureHistory() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Reset to the start of the day

  try {
    const records = await Temperature.find({
      timestamp: { $gte: startOfDay }, // Get records from the start of the day
    }).sort({ timestamp: 1 }); // Sort by time

    console.log("Daily temperature history:", records);
    return records;
  } catch (error) {
    console.error("Error retrieving temperature history:", error);
    throw error;
  }
}

// Export the Temperature Model
export default Temperature;

// usage
// import Temperature, { saveTemperatureData, getDailyTemperatureHistory } from "./Temperature";

// // Example: Save a new temperature record
// await saveTemperatureData(24.5, 60);

// // Example: Retrieve today's temperature history
// const history = await getDailyTemperatureHistory();
// console.log(history);