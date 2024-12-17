import mongoose from "mongoose";

// Define the Configurations Schema
const configSchema = new mongoose.Schema(
    // 1 boolean field to store the door status
    // 2 boolean field to stor the light auto-calibration status
    // 3 float field to store the light brightness value from 0 to 100

    {
        doorStatus: {
            type: Boolean,
            required: true,
            default: false,
        },
        lightAutoCalibration: {
            type: Boolean,
            required: true,
            default: false,
        },
        lightBrightness: {
            type: Number,
            required: true,
            default: 50,
        },
    }
);


// Create the Config Model
const Config = mongoose.models.Config || mongoose.model("Config", configSchema);

// Function to Initialize database with dummy data (if needed)
export async function initializeConfig() {
    try {
        const config = await Config.findOne();
        if (!config) {
            await Config.create({ doorStatus: false, lightAutoCalibration: false, lightBrightness: 50 });
            console.log("Configurations initialized");
        }
    }
    catch (error) {
        console.error("Error initializing configurations:", error);
        throw error;
    }
}

// Initialize the Configurations
initializeConfig();

// Function to Retrieve Configuration Data
export async function getDoorStatus() {
    try {
        const config = await Config.findOne();
        return config.doorStatus;
    } catch (error) {
        console.error("Error retrieving door status:", error);
        throw error;
    }
}

export async function getLightAutoCalibration() {
    try {
        const config = await Config.findOne();
        return config.lightAutoCalibration;
    }
    catch (error) {
        console.error("Error retrieving light auto-calibration status:", error);
        throw error;
    }
}

export async function getLightBrightness() {
    try {
        const config = await Config.findOne();
        return config.lightBrightness;
    }
    catch (error) {
        console.error("Error retrieving light brightness value:", error);
        throw error;
    }
}

// Function to Update Door Status
export async function updateDoorStatus(status) {
    try {
        const config = await Config.findOne();
        console.log("Found config:", config);
        config.doorStatus = status;
        await config.save();
        console.log("Door status updated:", status);
        return config;
    } catch (error) {
        console.error("Error updating door status:", error);
        throw error;
    }
}

// Function to Update Light Auto-Calibration Status
export async function updateLightAutoCalibration(status) {
    try {
        const config = await Config.findOne();
        config.lightAutoCalibration = status;
        await config.save();
        console.log("Light auto-calibration status updated:", status);
        return config;
    } catch (error) {
        console.error("Error updating light auto-calibration status:", error);
        throw error;
    }
}

// Function to Update Light Brightness Value
export async function updateLightBrightness(brightness) {
    try {
        const config = await Config.findOne();
        config.lightBrightness = brightness;
        await config.save();
        console.log("Light brightness value updated:", brightness);
        return config;
    }
    catch (error) {
        console.error("Error updating light brightness value:", error);
        throw error;
    }
}

// Export the Config Model
export default Config;

// usage
// import Config, { getDoorStatus, getLightAutoCalibration, getLightBrightness, updateDoorStatus, updateLightAutoCalibration, updateLightBrightness } from "./Config";