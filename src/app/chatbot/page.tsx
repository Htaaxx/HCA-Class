'use client';

import { useState } from "react";
import { FiGrid, FiSettings, FiBarChart2, FiLogOut } from "react-icons/fi";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "bot", content: "Xin chào! Tôi có thể giúp gì cho bạn." },
  ]);
  const [userInput, setUserInput] = useState("");

  // Function to handle user input and generate a bot response
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
    ]);

    // Add bot response
    try {
      const botResponse = await generateBotResponse(userInput); // Call the async function
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: botResponse },
      ]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Something went wrong. Please try again later." },
      ]);
    }

    // Clear input
    setUserInput("");
  };

  // Function to generate a bot response
  const generateBotResponse = async (message: string): Promise<string> => {
    try {
      // Fetch the bot response from the API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      // Return the bot response message from the json
      const result = await response.json();
      return result.message;
    } catch (error) {
      console.error("Error generating bot response:", error);
      throw error;
    }
  };

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
          <h1 className="text-3xl font-bold text-purple-600">Chatbot</h1>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <a href="/profile" className="text-gray-700 font-bold">
              P
            </a>
          </button>
        </header>

        {/* Chatbot Section */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 mt-8 h-[80vh]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-600 self-end"
                    : "bg-gray-100 text-gray-600 self-start"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-md mr-2"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
