import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-sm text-gray-700 mb-4">
          You do not have permission to access this page.
        </p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          Go back to portal
        </Link>
      </div>
    </div>
  );
}
