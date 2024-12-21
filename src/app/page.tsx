import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white w-screen h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <h1 className="text-xl font-bold text-purple-400">SmartClass</h1>
        <div>
          <button className="text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition">
            <a href="signup">Sign Up</a>
          </button>
          <button className="ml-4 text-purple-600 bg-white px-4 py-2 rounded-md hover:bg-gray-100 transition">
            <a href="signin">Sign In</a>
          </button>
        </div>
      </header>

      {/* Main Content with Dimmed Background */}
      <main className="relative flex-1 flex items-center px-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/img.jpg')", // Path to your image
          }}
        ></div>

        {/* Dimmed Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg max-w-lg">
          <h2 className="text-4xl font-bold text-purple-300 mb-4 text-left">
            The Future of Learning Environments
          </h2>
          <p className="text-lg text-gray-300 mb-6 text-left">
            SmartClass transforms classrooms with facial recognition, automated
            comfort controls, and real-time safety alerts for a smarter, safer
            learning environment.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-700 transition text-left">
            <a href="signin">Log in now</a>
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
