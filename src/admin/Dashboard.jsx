import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signOut } from '../firebase';

export default function AdminDashboard({ user }) {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = async () => {
    setMessage('');
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      setMessage('Trusted user created successfully!');
      setNewEmail('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to create user.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Welcome, Admin! 🛡</p>

      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Gift Card Redemptions</h2>
        <p className="text-gray-500 text-sm">Coming soon: a list of all recent redemptions.</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Create Trusted User</h2>
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded text-sm"
        />
        <button
          onClick={handleCreateUser}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
        >
          Create Trusted User
        </button>

        {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      </div>

      <button onClick={handleLogout} className="mt-8 text-sm text-red-600 underline">
        Log out
      </button>
    </div>
  );
}
