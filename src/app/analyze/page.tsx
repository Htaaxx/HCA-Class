'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiGrid, FiSettings, FiBarChart2, FiLogOut } from "react-icons/fi";

export default function Dashboard() {
  interface AttendanceRecord {
    date: string;
    count: number;
  }

  interface TemperatureRecord {
    timestamp: string;
    currentTemperature: number;
    currentHumidity: number;
  }

  interface DashboardData {
    todayAttendanceCount: number;
    attendanceHistory: AttendanceRecord[];
    temperatureData: TemperatureRecord[];
  }

  const [data, setData] = useState<DashboardData>({
    todayAttendanceCount: 0,
    attendanceHistory: [],
    temperatureData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/analyze");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare the temperature and humidity data for the graph
  const temperatureGraphData = data.temperatureData.map((record) => ({
    time: new Date(record.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: record.currentTemperature,
    humidity: record.currentHumidity,
  }));

  // Prepare the attendance data for the graph
  const attendanceGraphData = data.attendanceHistory.map((record) => ({
    date: record.date.substring(0, 10),
    count: record.count,
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 bg-white shadow-lg h-screen flex flex-col z-50">
        <div className="p-6 font-bold text-lg border-b border-gray-200">
          <span className="text-purple-600">Smart</span>
          <span className="text-black">Class</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-4 px-6 py-4">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100"
              >
                <FiGrid className="mr-3 text-gray-500" size={18} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/analyze"
                className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100"
              >
                <FiBarChart2 className="mr-3 text-gray-500" size={18} />
                Analyze
              </a>
            </li>
            <li>
              <a
                href="/configuration"
                className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100"
              >
                <FiSettings className="mr-3 text-gray-500" size={18} />
                Configuration
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-200">
          <a
            href="/"
            className="flex items-center p-3 text-gray-500 hover:text-gray-700 hover:underline"
          >
            <FiLogOut className="mr-3" size={18} />
            Log Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <header className="flex items-center justify-between pb-6 border-b">
          <h1 className="text-3xl font-bold text-purple-600">22CLC06</h1>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Replace with your profile picture */}
            <a href="/profile" className="text-gray-700 font-bold">
              P
            </a>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Activity Log */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <div className="space-y-3">
              <div className="bg-red-100 p-4 rounded-md text-red-600">
                <strong>13:34</strong> - A stranger showed up.{" "}
                <span className="font-bold">Be careful.</span>
              </div>
              <div className="bg-blue-100 p-4 rounded-md text-blue-600">
                <strong>13:34</strong> - Ha Tuan Anh showed up.
              </div>
            </div>
          </div>

          {/* Attendance History */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature and Humidity Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Temperature</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Humidity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
