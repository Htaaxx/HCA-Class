import jwt from "jsonwebtoken";

export const config = {
    runtime: 'nodejs', // Use the Node.js runtime
  };

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Invalid token", error: error.message }),
      { status: 401 }
    );
  }
}
