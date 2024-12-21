'use client';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { FiGrid, FiSettings, FiBarChart2, FiLogOut, FiCpu } from 'react-icons/fi';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  
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

  // Get lastest temperature and humidity data
  const temperatureData = data.temperatureData[data.temperatureData.length - 1];
  const currentTemperature = temperatureData?.currentTemperature;
  const currentHumidity = temperatureData?.currentHumidity;

  // Get the last 5 attendance records
  const attendanceHistory = data.attendanceHistory.slice(-5);

  // Get the date in the last 5 only in dd/mm format
  const formattedAttendanceHistory = attendanceHistory.map((record) => ({
    ...record,
    date: new Date(record.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    }),
    // Percentage of attendance (assuming min = 0, max = 100) max count = 60
    attendancePercentage: (record.count / 60) * 100,
  }));



  // Get formatted month and year
  const currentMonthYear = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  // Get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Change month navigation
  const navigateMonth = (direction: number) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + direction);
    setDate(newDate);
  };

  const customStyles = `
    .calendar-container {
      font-family: Arial, sans-serif;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
      text-align: center;
    }
    .calendar-grid div {
      padding: 0.75rem;
      border-radius: 0.5rem;
      background-color: #f0f0f0;
      cursor: pointer;
    }
    .calendar-grid .current-date {
      background-color: #f87171;
      color: white;
    }
    .calendar-grid div:hover {
      background-color: #ddd6fe;
    }
    .day-names {
      font-weight: bold;
      color: #6b7280;
    }
    .empty-cell {
      background-color: transparent;
      cursor: default;
    }
  `;

  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <style>{customStyles}</style>
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
            <li>
              <a
                href="/chatbot"
                className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100"
              >
                <FiCpu className="mr-3 text-gray-500" size={18} />
                Chat Bot
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-200">
          <a
            href="/"
            className="flex items-center p-3 text-gray-800 hover:text-gray-700 hover:underline"
          >
            <FiLogOut className="mr-3" size={18} />
            Log Out
          </a>
        </div>
      </aside>


      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 bg-gray-50">
        <header className="flex items-center justify-between pb-6 border-b">
          <h1 className="text-3xl font-bold text-purple-600">22CLC06</h1>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <a href="/profile" className="text-gray-700 font-bold">
              P
            </a>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {/* Calendar */}
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow calendar-container">
            <div className="calendar-header">
              <button
                className="text-gray-500 hover:text-purple-600"
                onClick={() => navigateMonth(-1)}
              >
                &lt;
              </button>
              <span className="text-xl font-bold">{currentMonthYear}</span>
              <button
                className="text-gray-500 hover:text-purple-600"
                onClick={() => navigateMonth(1)}
              >
                &gt;
              </button>
            </div>
            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="day-names">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, idx) => (
                <div key={idx} className="empty-cell"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, day) => {
                const isCurrentDate =
                  new Date().getDate() === day + 1 &&
                  new Date().getMonth() === month &&
                  new Date().getFullYear() === year;

                return (
                  <div
                    key={day}
                    className={isCurrentDate ? 'current-date' : ''}
                  >
                    {day + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attend */}
          <div className="bg-purple-100 p-4 rounded-lg shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Attend</h2>
            <p className="text-2xl font-bold text-gray-900">{data.todayAttendanceCount}</p>
          </div>

          {/* Temp */}
          <div className="bg-blue-100 p-4 rounded-lg shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Temp</h2>
            <p className="text-2xl font-bold text-gray-900">{currentTemperature}°C</p>
          </div>

          {/* Humid */}
          <div className="bg-teal-100 p-4 rounded-lg shadow flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Humid</h2>
            <p className="text-2xl font-bold text-gray-900">{currentHumidity}%</p>
          </div>

          {/* Upcoming Class
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Upcoming Class</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Physics</span>
                <span className="text-sm">09:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Maths</span>
                <span className="text-sm">12:00 PM</span>
              </div>
            </div>
          </div> */}

          {/* Attend History */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Attend History</h2>
            <div className="space-y-2">
              {formattedAttendanceHistory.map((record, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{record.date}</span> {/* Display formatted date */}
                  <div className="w-2/3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${record.attendancePercentage}%` }} // Assuming attendancePercentage is available
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Notes</h2>
            <ul className="space-y-2">
              <li>Monday, 6th April 2020 - Quiz 01</li>
              <li>Thursday, 24th October 2021 - Mid-term Exam</li>
              <li>Monday, 13th August 2018 - Project Meeting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
