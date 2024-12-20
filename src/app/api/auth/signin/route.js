// src/app/api/auth/signin/route.js

import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/Users";
import bcrypt from "bcrypt";

// Use a named export for POST
export async function POST(req) {
  const { email, password } = await req.json(); // Parse the request body

  try {
    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      );
    }

    console.log("User:", user);

    // Send a successful response with the user's data (except the password)
    return new Response(
      JSON.stringify({ message: "Login successful", user: { id: user._id, email: user.email } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during signin:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500 }
    );
  }
}
