"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) throw new Error('Failed to fetch user data');
        const result = await res.json();
        
        if (!result.user) {
          router.push('/login', undefined, { replace: true });
        } else {
          setUser(result.user);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login', undefined, { replace: true });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
      setError("Failed to log out. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>DASHBOARD</h2>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
