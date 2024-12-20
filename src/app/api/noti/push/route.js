import {sendNotification} from "../../../../noti/noti";

export async function POST(req) {
    const { title, message } = await req.json(); // Parse the request body
    console.log("Title:", title );
    console.log("Message:", message );
    try {
        // Send a notification
        await sendNotification(title, message);
        return new Response(
            JSON.stringify({ message: "Notification sent successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending notification:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}