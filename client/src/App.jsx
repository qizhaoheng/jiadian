import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Appliances from './pages/Appliances';
import Compare from './pages/Compare';
import Plans from './pages/Plans';
import Knowledge from './pages/Knowledge';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="max-w-mobile mx-auto min-h-screen bg-white shadow-xl relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/knowledge" element={<Knowledge />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;