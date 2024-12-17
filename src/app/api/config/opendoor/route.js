// API endpoint: /api/config/opendoor
// Parameters: toggle boolean
// Method: POST

import dbConnect from "../../../../lib/mongodb";
import Config, { updateDoorStatus, getDoorStatus } from "../../../../models/Configs";

// Use a named export for POST
export async function POST(req) {
  const { doorStatus } = await req.json(); // Parse the request body

  try {
    await dbConnect();

    // Call the API to update the door configuration
    
    // Update the door configuration
    console.log("Toggle type:", typeof doorStatus);
    updateDoorStatus(doorStatus);

    return new Response(
      JSON.stringify({ message: "Door configuration updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating door configuration:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}

// GET

export async function GET(req) {
    try {
        await dbConnect();
        // Get the door configuration
        const open = await getDoorStatus();
    
        return new Response(
        JSON.stringify({ doorStatus: open }),
        { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving door configuration:", error);
        return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
        );
    }
}   
