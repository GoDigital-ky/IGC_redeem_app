import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import GiftCardPortal from './GiftCardPortal';
import Dashboard from './admin/Dashboard';
import AccessDenied from './pages/AccessDenied';
import { auth } from './firebase';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const adminEmails = [
    'islandgiftcards.net@gmail.com',
    'anotheradmin@example.com',
    'yourbackupadmin@gmail.com'
  ];

  const isAdmin = user && adminEmails.includes(user.email);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={
            user ? (isAdmin ? <Dashboard /> : <AccessDenied />) : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={user ? <GiftCardPortal user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
