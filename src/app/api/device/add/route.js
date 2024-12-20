// src/app/api/device/add/route.js

// POST /api/device/add
// Add a device to the user's list
// Request body: { email: string, deviceId: string }

import dbConnect from "../../../../lib/mongodb";
import Device, { addDevice, initializeEmail } from "../../../../models/Devices";

export async function POST(req) {
    try {
        // Parse the request body
        const { email, deviceId } = await req.json();
        console.log("email of addDevice", email);
        console.log("deviceId of addDevice", deviceId);

        // Check if email and deviceId are provided
        if (!email || !deviceId) {
            return new Response(
                JSON.stringify({ message: "Email and deviceId are required" }),
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Initialize the email if not already present
        await initializeEmail(email);

        // Add the device to the user's list
        await addDevice(email, deviceId);

        // Save the device
        // await Device.save();

        return new Response(
            JSON.stringify({ message: "Device added" }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error adding device:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}

