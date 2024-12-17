// API endpoint: /api/config/calibrate
// Parameters: lightBrightness number, lightAutoCalibration boolean
// Method: POST
//

import dbConnect from "../../../../lib/mongodb";
import Config, { updateLightAutoCalibration, updateLightBrightness, getLightBrightness, getLightAutoCalibration } from "../../../../models/Configs";

// Use a named export for POST
export async function POST(req) {
  const { lightBrightness, lightAutoCalibration } = await req.json(); // Parse the request body

  try {
    await dbConnect();

    // Call the API to update the calibration configuration

    // Update the calibration configuration
    await updateLightBrightness(lightBrightness);
    await updateLightAutoCalibration(lightAutoCalibration);

    return new Response(
      JSON.stringify({ message: "Calibration configuration updated"}),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating calibration configuration:", error);
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
        // Get the calibration configuration
        const lightBrightness = await getLightBrightness();
        const lightAutoCalibration = await getLightAutoCalibration();
    
        console.log("Calibration configuration retrieved:", lightBrightness, lightAutoCalibration);
    
        return new Response(
        JSON.stringify({ lightBrightness, lightAutoCalibration }),
        { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving calibration configuration:", error);
        return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
        );
    }
}
