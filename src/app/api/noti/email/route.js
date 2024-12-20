import {sendEmail} from "../../../../noti/noti";
import User from "../../../../models/Users";

export async function POST(req) {
    const { subject, text, html } = await req.json(); // Parse the request body
    console.log("Subject:", subject );
    console.log("Text:", text );
    console.log("HTML:", html );

    // Get the list of email addresses
    const recipient = await User.find({
        email: { $exists: true, $ne: "" },
    }).select("email -_id");
    console.log("Recipient:", recipient );
    // List of string
    const emailList = recipient.map((user) => user.email);
    console.log("Email List:", emailList );
    try {
        // Send an email
        await sendEmail(emailList, subject, text, html);
        return new Response(
            JSON.stringify({ message: "Email sent successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}
