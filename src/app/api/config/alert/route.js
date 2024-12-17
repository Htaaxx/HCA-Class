// API Endpoint: /api/config/alert
// Parameters: type string
// Method: POST

export async function POST(req) {
  const { type } = await req.json(); // Parse the request body

  try {
    // Update the alert configuration
    // Add api later

    console.log("Alert configuration updated:", type);

    return new Response(
      JSON.stringify({ message: "Alert configuration updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating alert configuration:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
