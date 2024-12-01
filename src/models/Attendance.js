import mongoose from "mongoose";

// Define the Attendance Schema
const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // Ensure one record per day
  },
  attendees: {
    type: [String], // Array of student identifiers (e.g., IDs or names)
    required: true,
    default: [], // Defaults to an empty list if no attendees yet
  },
});

// Create the Attendance Model
const Attendance = mongoose.model("Attendance", attendanceSchema);

// Function to Update Today's Attendance
export async function updateTodayAttendance(studentId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight for consistency

  try {
    let attendanceRecord = await Attendance.findOne({ date: today });

    if (!attendanceRecord) {
      // If no record exists for today, create a new one
      attendanceRecord = new Attendance({ date: today, attendees: [] });
    }

    if (!attendanceRecord.attendees.includes(studentId)) {
      attendanceRecord.attendees.push(studentId); // Add student if not already present
      await attendanceRecord.save();
      console.log("Attendance updated for today:", attendanceRecord);
    } else {
      console.log(`Student ${studentId} is already marked as present.`);
    }

    return attendanceRecord;
  } catch (error) {
    console.error("Error updating today's attendance:", error);
    throw error;
  }
}

// Function to Get Today's Attendance Count
export async function getTodayAttendanceCount() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const attendanceRecord = await Attendance.findOne({ date: today });
    const count = attendanceRecord ? attendanceRecord.attendees.length : 0;
    console.log("Today's attendance count:", count);
    return count;
  } catch (error) {
    console.error("Error retrieving today's attendance count:", error);
    throw error;
  }
}

// Function to Get Attendance History by Date
export async function getAttendanceHistory(date = null) {
  try {
    if (date) {
      // Fetch attendance for a specific date
      const specificDate = new Date(date);
      specificDate.setHours(0, 0, 0, 0);

      const record = await Attendance.findOne({ date: specificDate });
      const count = record ? record.attendees.length : 0;
      console.log(`Attendance count for ${specificDate.toDateString()}:`, count);
      return { date: specificDate, count };
    } else {
      // Fetch attendance counts for all dates
      const records = await Attendance.find().sort({ date: 1 });
      const history = records.map(record => ({
        date: record.date,
        count: record.attendees.length,
      }));

      console.log("Attendance history:", history);
      return history;
    }
  } catch (error) {
    console.error("Error retrieving attendance history:", error);
    throw error;
  }
}

// Export the Attendance Model
export default Attendance;

// usage

// import Attendance, {
//     updateTodayAttendance,
//     getTodayAttendanceCount,
//     getAttendanceHistory,
//   } from "./Attendance";
  
//   // Example: Update today's attendance with a student ID
//   await updateTodayAttendance("student123");
  
//   // Example: Get today's attendance count
//   const todayCount = await getTodayAttendanceCount();
//   console.log("Today's count:", todayCount);
  
//   // Example: Get attendance for a specific date
//   const specificDateCount = await getAttendanceHistory("2024-12-01");
//   console.log("Attendance for 2024-12-01:", specificDateCount);
  
//   // Example: Get attendance history for all dates
//   const history = await getAttendanceHistory();
//   console.log("Attendance history:", history);
  