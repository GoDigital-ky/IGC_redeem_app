import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-sm mb-6">Welcome, Admin! 🔐</p>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Gift Card Redemptions</h2>
        <p className="text-gray-500 text-sm">Coming soon: a list of all recent redemptions.</p>
      </div>

      <div className="text-right">
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Log out
        </button>
      </div>
    </div>
  );
}
