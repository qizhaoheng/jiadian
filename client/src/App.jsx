import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Appliances from './pages/Appliances';
import Compare from './pages/Compare';
import Plans from './pages/Plans';
import Knowledge from './pages/Knowledge';
import Login from './pages/Login';

function App() {
  const [identifier, setIdentifier] = useState(() => localStorage.getItem('identifier') || '');

  useEffect(() => {
    const syncIdentifier = () => {
      setIdentifier(localStorage.getItem('identifier') || '');
    };
    window.addEventListener('storage', syncIdentifier);
    window.addEventListener('identifier-changed', syncIdentifier);
    return () => {
      window.removeEventListener('storage', syncIdentifier);
      window.removeEventListener('identifier-changed', syncIdentifier);
    };
  }, []);

  const isAuthed = Boolean(identifier);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-mobile mx-auto min-h-screen bg-white shadow-xl relative">
          <Routes>
            <Route path="/login" element={isAuthed ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/" element={isAuthed ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/appliances" element={isAuthed ? <Appliances /> : <Navigate to="/login" replace />} />
            <Route path="/compare" element={isAuthed ? <Compare /> : <Navigate to="/login" replace />} />
            <Route path="/plans" element={isAuthed ? <Plans /> : <Navigate to="/login" replace />} />
            <Route path="/knowledge" element={isAuthed ? <Knowledge /> : <Navigate to="/login" replace />} />
          </Routes>
          {isAuthed && <BottomNav />}
        </div>
      </div>
    </Router>
  );
}

export default App;
