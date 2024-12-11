import dbConnect from "../../../lib/mongodb";
import Attendance, { getTodayAttendanceCount, getAttendanceHistory} from "../../../models/Attendances";
import Temperature, { getDailyTemperatureHistory } from "../../../models/Temperatures";
import User from "../../../models/Users";

export async function GET(req, res) {
  await dbConnect(); 

  try {

    // const today = new Date();
    const todayAttendance = await getTodayAttendanceCount();
    const todayAttendanceCount = todayAttendance ? todayAttendance : 0;
    console.log("Today's attendance count:", todayAttendanceCount);

    const attendanceHistory = await getAttendanceHistory();

    const temperatureData = await getDailyTemperatureHistory();

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
