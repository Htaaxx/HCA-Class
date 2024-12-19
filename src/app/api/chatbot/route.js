// API Endpoint: /api/chatbot
// Parameters: message string
// Method: GET

import Groq from "groq-sdk";
import dbConnect from "../../../lib/mongodb";
import Attendance, { getTodayAttendanceCount, getAttendanceHistory} from "../../../models/Attendances";
import Temperature, { getDailyTemperatureHistory } from "../../../models/Temperatures";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



export async function POST(req) {
    await dbConnect(); 
    const { message } = await req.json(); // Parse the request body
    console.log("Message:", message );

    try {
        // Query the chatbot API
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        const todayAttendance = await getTodayAttendanceCount();
        const todayAttendanceCount = todayAttendance ? todayAttendance : 0;
        console.log("Today's attendance count:", todayAttendanceCount);
        const attendanceHistory = await getAttendanceHistory();
        const temperatureData = await getDailyTemperatureHistory();

        console.log("Today's attendance count:", todayAttendance);
        console.log("Attendance history:", attendanceHistory);
        console.log("Temperature data:", temperatureData);


        const template = 
            `Bạn là một chatbot để truy vấn thông tin hệ thống. Bạn biết về lịch sử điểm danh, dữ liệu nhiệt độ của một lớp học.
            Hôm nay là ngày ${today}, hiện tại là ${time}. Số lượng học sinh đã điểm danh hôm nay là ${todayAttendanceCount}.
            Lịch sử điểm danh gần đây: ${attendanceHistory}. Dữ liệu nhiệt độ là: ${temperatureData}. Khi trả lời người dùng, hãy nói một cách dễ hiểu cho con người.
            Khi người dùng hỏi vể dữ liệu hiện tại, hãy trả về dữ liệu có được gần nhất.`;
        const response = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: template,
              },
              {
                role: "user",
                content: message,
            }
            ],
            model: "llama-3.3-70b-versatile",
          });
        // console.log("Chatbot response:", response);
        const result = response.choices[0]?.message?.content || "";
        console.log("Chatbot response:", result);
        return new Response(
        JSON.stringify({ message: result }),
        { status: 200 }
        );
    } catch (error) {
        console.error("Error querying chatbot API:", error);
        return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
        );
    }
}
    

