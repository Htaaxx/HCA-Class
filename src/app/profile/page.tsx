'use client'; // Client-side rendering

import { useEffect, useState } from "react";

export default function Profile() {
  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

    fetchUserData();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.firstName} {user.lastName}'s Profile</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div>Please log in to view your profile.</div>
      )}
    </div>
  );
}
