// src/app/api/device/remove/route.js

// POST /api/device/remove
// Remove a device from the user's list
// Request body: { email: string, deviceId: string }

import dbConnect from "../../../../lib/mongodb";
import Device, { removeDevice } from "../../../../models/Devices";

export async function POST(req) {
    try {
        // Parse the request body
        const { email, deviceId } = await req.json();

        // Check if email and deviceId are provided
        if (!email || !deviceId) {
            return new Response(
                JSON.stringify({ message: "Email and deviceId are required" }),
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Remove the device from the user's list
        await removeDevice(email, deviceId);

        // Save the device
        // await Device.save();

        return new Response(
            JSON.stringify({ message: "Device removed" }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error removing device:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}