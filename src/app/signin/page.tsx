'use client'; // Client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Login result:", result);

      if (response.ok) {
        alert("Login successful!");

        // Save the user info or JWT token to localStorage
        localStorage.setItem("email", email); // Save only email

        // Redirect user to dashboard after successful login
        router.push("/dashboard");
        console.log("User logged in:", result);
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get started.</h2>
        <p className="text-sm text-gray-500 mb-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-500 font-semibold hover:underline">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
