import dbConnect from "../../../lib/mongodb";
import Attendance from "../../../models/Attendance";
import Temperature from "../../../models/Temperature";
import User from "../../../models/Users";

export async function GET(req, res) {
  await dbConnect(); 

  try {
    const today = new Date();
    const todayAttendance = await Attendance.findOne({
      date: today.toISOString().substring(0, 10),
    });
    const todayAttendanceCount = todayAttendance ? todayAttendance.count : 0;

    const attendanceHistory = await Attendance.find({})
      .limit(7);
    console.log("Attendance History:", attendanceHistory);

    const temperatureData = await Temperature.find({})
      .limit(10);
    console.log("Temperature Data:", temperatureData);

    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5);

    return new Response(
      JSON.stringify({
        todayAttendanceCount,
        attendanceHistory,
        temperatureData,
        recentUsers,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching dashboard data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
