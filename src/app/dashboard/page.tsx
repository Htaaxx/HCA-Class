import { FiGrid, FiSettings, FiBarChart2, FiLogOut } from "react-icons/fi";

export default function Dashboard() {
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
        <div className="ml-64 flex-1 p-6 bg-gray-50">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">22CLC06</h1>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </header>
  
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">March, 2022</h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                {[...Array(31).keys()].map(day => (
                  <div
                    key={day}
                    className={`p-2 rounded ${day + 1 === 16 ? 'bg-red-200' : 'bg-gray-100'}`}
                  >
                    {day + 1}
                  </div>
                ))}
              </div>
            </div>
  
            {/* Attend */}
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Attend</h2>
              <p className="text-2xl font-bold">45%</p>
            </div>
  
            {/* Temp */}
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Temp</h2>
              <p className="text-2xl font-bold">20°C</p>
            </div>
  
            {/* Humid */}
            <div className="bg-teal-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Humid</h2>
              <p className="text-2xl font-bold">25%</p>
            </div>
  
            {/* Upcoming Class */}
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
            </div>
  
            {/* Attend History */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Attend History</h2>
              <div className="space-y-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{day}</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${index * 20}%` }}
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