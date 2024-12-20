'use client'; // Client-side rendering

import { useEffect, useState } from "react";
import { FiGrid, FiSettings, FiBarChart2, FiLogOut, FiCpu, FiPlus, FiX } from "react-icons/fi"; // Import icons


export default function Profile() {
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<any[]>([]);
  const [newDevice, setNewDevice] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const response = await fetch(`/api/getuser?email=${email}`);
          const result = await response.json();
          if (response.ok) {
            setUser(result.user);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchDeviceData = async () => {
      if (email) {
        try {
          const response = await fetch("/api/device/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const result = await response.json();
          if (response.ok) {
            setDevice(result.devices);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching device data:", error);
        }
      }
    };

    fetchUserData();
    fetchDeviceData();
  }, [email]);

  const handleAddDevice = async () => {
    if (newDevice.trim() === "") return;

    try {
      const response = await fetch("/api/device/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, deviceId: newDevice }),
      });
      const result = await response.json();
      if (response.ok) {
        setDevice([...device, newDevice]);
        setNewDevice(""); // Clear input
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleRemoveDevice = async (deviceName: string) => {
    try {
      const response = await fetch("/api/device/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, deviceId: deviceName }),
      });
      const result = await response.json();
      if (response.ok) {
        setDevice(device.filter((d) => d !== deviceName));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error removing device:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <a href="/dashboard" className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100">
                <FiGrid className="mr-3 text-gray-500" size={18} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/analyze" className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100">
                <FiBarChart2 className="mr-3 text-gray-500" size={18} />
                Analyze
              </a>
            </li>
            <li>
              <a href="/configuration" className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100">
                <FiSettings className="mr-3 text-gray-500" size={18} />
                Configuration
              </a>
            </li>
            <li>
              <a href="/chatbot" className="flex items-center p-3 bg-gray-100 text-gray-600 rounded-md hover:bg-purple-100">
                <FiCpu className="mr-3 text-gray-500" size={18} />
                Chat Bot
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-200">
          <a href="/" className="flex items-center p-3 text-gray-500 hover:text-gray-700 hover:underline">
            <FiLogOut className="mr-3" size={18} />
            Log Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <header className="flex items-center justify-between pb-6 border-b">
          <h1 className="text-3xl font-bold text-purple-600">Profile</h1>
        </header>

        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          {user ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
              <p className="text-lg text-gray-600">Email: {user.email}</p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold">Registered Devices</h3>
                <ul className="mt-4 space-y-2">
                  {device.length > 0 ? (
                    device.map((deviceName, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{deviceName}</span>
                        <button
                          onClick={() => handleRemoveDevice(deviceName)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiX />
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>No devices registered.</li>
                  )}
                </ul>

                <div className="mt-6">
                  <input
                    type="text"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    className="border border-gray-300 p-3 rounded-md w-full mb-4"
                    placeholder="Add a new device"
                  />
                  <button
                    onClick={handleAddDevice}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md"
                  >
                    <FiPlus className="mr-2" />
                    Add Device
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Please log in to view your profile.</div>
          )}
        </div>
      </main>
    </div>
  );
}
