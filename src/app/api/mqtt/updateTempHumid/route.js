import dbConnect from "../../../../lib/mongodb";
import Temperature from "../../../../models/Temperature";

export async function POST(req) {
  try {
    await dbConnect();

    const { temperature, humidity } = await req.json();

    if (temperature === undefined || humidity === undefined) {
      return new Response(JSON.stringify({ message: "Temperature and Humidity are required" }), {
        status: 400,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    // Find today's record or create a new one
    let record = await Temperature.findOne({ date: today });
    if (!record) {
      record = new Temperature({ date: today, readings: [] });
    }

    // Add the new reading
    record.readings.push({ temperature, humidity, timestamp: new Date() });
    await record.save();

    return new Response(JSON.stringify({ message: "Temperature and Humidity updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating temperature and humidity:", error);
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), {
      status: 500,
    });
  }
}
