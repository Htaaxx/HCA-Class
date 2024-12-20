// src/app/api/device/get/route.js

// POST /api/device/get

// Get the list of devices for a user
// Request body: { email: string }

import dbConnect from "../../../../lib/mongodb";
import Device, { getDevices } from "../../../../models/Devices";

export async function POST(req) {
    try {
        // Parse the request body
        const { email } = await req.json();
        console.log("email of getDevices", email);

        // Check if email is provided
        if (!email) {
            return new Response(
                JSON.stringify({ message: "Email is required" }),
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Get the list of devices for the user
        const devices = await getDevices(email);
        console.log("devices of getDevices", devices);
        return new Response(
            JSON.stringify({ devices }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching devices:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}

