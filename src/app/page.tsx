import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white w-screen h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <h1 className="text-xl font-bold text-purple-400">SmartClass</h1>
        <div>
          <button className="text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Sign Up
          </button>
          <button className="ml-4 text-purple-600 bg-white px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content with Image Background */}
      <main
        className="flex-1 flex items-center bg-cover bg-center px-8"
        style={{
          backgroundImage: "url('/image.png')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-lg">
          <h2 className="text-4xl font-bold text-purple-300 mb-4 text-left">
            The Future of Learning Environments
          </h2>
          <p className="text-lg text-gray-300 mb-6 text-left">
            SmartClass transforms classrooms with facial recognition, automated comfort controls, and real-time safety alerts for a smarter, safer learning environment.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-700 transition text-left">
            Log in now
          </button>
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4">
        © 2024 SmartClass, Inc.
      </footer>
    </div>
  );
}
