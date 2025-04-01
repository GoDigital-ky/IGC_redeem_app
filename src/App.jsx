import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import GiftCardPortal from './GiftCardPortal';
import Dashboard from './admin/Dashboard';
import { auth } from './firebase';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  const adminEmails = [
    'islandgiftcards.net@gmail.com',
    'info@islandgiftcards.net',
    'info@godigital.ky'
  ];
  
  const isAdmin = user && adminEmails.includes(user.email);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={isAdmin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <GiftCardPortal user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
