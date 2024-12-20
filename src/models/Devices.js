import mongoose from "mongoose";

// Define the Configurations Schema
const deviceSchema = new mongoose.Schema(
    // 1 string field to store the email
    // 1 list of strings to store the devices id

    {
        email: {
            type: String,
            required: true,
            default: "",
        },
        devices: {
            type: [String],
            required: true,
            default: [],
        },
    }
);

const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

export async function initializeEmail(email) {
    try {
        const device = await
            Device.findOne({ email: email });
        if (!device) {
            await Device.create({ email: email, devices: [] });
            console.log("Device initialized");
        }
    }
    catch (error) {
        console.error("Error initializing device:", error);
        throw error;
    }
}

export async function getDevices(email) {
    console.log("email of getDevices in db", email);
    try {
        const device = await
            Device.findOne({ email: email });
        console.log("device of getDevices in db", device);
        if (!device) {
            return [];
        }
        return device.devices;
    }
    catch (error) {
        console.error("Error retrieving devices:", error);
        throw error;
    }
}
    

export async function addDevice(email, deviceId) {
    try {
        // Find if email already exists
        const device = await Device
            .findOne({ email: email });

        // If email does not exist, create a new entry
        if (!device) {
            await Device.create({ email: email, devices: [deviceId] });
        }
        // If the device is already in the list, do nothing
        if (device.devices.includes(deviceId)) {
            return;
        }
        // Add the device to the list
        device.devices.push(deviceId);
        await device.save();
    }
    catch (error) {
        console.error("Error adding device:", error);
        throw error;
    }
}

export async function removeDevice(email, deviceId) {
    try {
        const device = await
            Device.findOne({ email:email });
        if (!device) {
            return;
        }
        // Remove the device from the list
        device.devices = device.devices.filter((id) => id !== deviceId);
        await device.save();
    }
    catch (error) {
        console.error("Error removing device:", error);
        throw error;
    }
}


        

