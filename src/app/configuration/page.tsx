// app/page.js
"use client";

import { useEffect, useState } from "react";
import { FiGrid, FiBarChart2, FiSettings, FiLogOut, FiCpu } from "react-icons/fi";
import axios from "axios";
import { set } from "mongoose";
import { send, title } from "process";

export default function Home() {

  // Get the current state of the light with axios

  const [autoCalibrate, setAutoCalibrate] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(50);

  // Get light data
  useEffect(() => {
    axios.get("http://localhost:3000/api/config/light").then((res) => {
      setAutoCalibrate(res.data.lightAutoCalibration);
      setLightIntensity(res.data.lightBrightness);
    })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Get door data
  useEffect(() => {
    axios.get("http://localhost:3000/api/config/opendoor").then((res) => {
      setOpenDoor(res.data.doorStatus);
    })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Log the data
  console.log(autoCalibrate);
  console.log(openDoor);
  console.log(lightIntensity);


  const handleAutoCalibrateToggle = () => {
    const newAutoCalibrate = !autoCalibrate;
    setAutoCalibrate(newAutoCalibrate);
    fetch("http://localhost:3000/api/config/light", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lightAutoCalibration: newAutoCalibrate,
        lightBrightness: lightIntensity,
      }),
    });
  };

  const handleOpenDoorToggle = () => {
    const newOpenDoor = !openDoor;
    setOpenDoor(newOpenDoor);
    fetch("http://localhost:3000/api/config/opendoor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doorStatus: newOpenDoor,
      }),
    });
  };

  const handleLightIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightIntensity = parseInt(e.target.value);
    setLightIntensity(newLightIntensity);
    fetch("http://localhost:3000/api/config/light", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lightBrightness: newLightIntensity,
        lightAutoCalibration: autoCalibrate,
      }),
    });
  };

  const handleFireEmergency = () => {
    alert("Fire emergency - Alert student");
    fetch("http://localhost:3000/api/config/alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "fire",
      }),
    });
    // Call the API to alert the through mail
    try {
      fetch("http://localhost:3000/api/noti/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Fire emergency",
          text: "There is a fire emergency in the classroom. Please evacuate immediately.",
          html: ""
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Call the API to alert the through push notification
    try {
      fetch("http://localhost:3000/api/noti/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Fire emergency",
          message: "There is a fire emergency in the classroom. Please evacuate immediately.",
        }),
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  const handleEarthquakeEmergency = () => {
    alert("Earthquake emergency - Alert student");
    fetch("http://localhost:3000/api/config/alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "earthquake",
      }),
    });

    // Call the API to alert the through mail
    try {
      fetch("http://localhost:3000/api/noti/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Earthquake emergency",
          text: "There is an earthquake emergency in the classroom. Please evacuate immediately.",
          html: ""
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Call the API to alert the through push notification
    try {
      fetch("http://localhost:3000/api/noti/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Earthquake emergency",
          message: "There is an earthquake emergency in the classroom. Please evacuate immediately.",
        }),
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            className="flex items-center p-3 text-gray-500 hover:text-gray-700 hover:underline"
          >
            <FiLogOut className="mr-3" size={18} />
            Log Out
          </a>
        </div>
      </aside>


      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b">
          <h1 className="text-3xl font-bold text-purple-600">22CLC06</h1>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Replace with your profile picture */}
            <a href="/profile" className="text-gray-700 font-bold">
              P
            </a>
          </button>
        </header>

        <div className="w-full max-w-4xl p-6 mt-10 bg-white shadow-md rounded-lg">
          <div className="grid gap-6">
            {/* Control Section */}
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Control</h2>

              <div className="flex items-center justify-between mb-4">
                <label className="font-medium">Auto calibrate light</label>
                <button
                  onClick={handleAutoCalibrateToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${autoCalibrate ? "bg-purple-500" : "bg-gray-300"
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${autoCalibrate ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <label className="font-medium">Light intensity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightIntensity}
                  onChange={handleLightIntensityChange}
                  className="w-2/3"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-medium">Open door</label>
                <button
                  onClick={handleOpenDoorToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${openDoor ? "bg-purple-500" : "bg-gray-300"
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${openDoor ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* Emergency Section */}
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Emergency</h2>

              <div className="flex flex-col gap-4">
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-lg font-medium"
                  onClick={handleFireEmergency}
                >
                  Fire emergency - Alert student
                </button>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-lg font-medium"
                  onClick={handleEarthquakeEmergency}
                >
                  Earthquake emergency - Alert student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
