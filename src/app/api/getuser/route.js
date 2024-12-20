import dbConnect from "../../../lib/mongodb";
import User, { getUserByEmail } from "../../../models/Users";

export async function GET(req) {
    try {
        // Extract email from query params (check if using regular API route or edge runtime)
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return new Response(
                JSON.stringify({ message: "Email query parameter is required" }),
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Fetch the user by email
        const user = await getUserByEmail(email);

        // If no user found
        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        // Return the user info
        return new Response(
            JSON.stringify({ user }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}
