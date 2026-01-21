import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ForestDetails from './pages/ForestDetails';
import History from './pages/History';
import AlertsPage from './pages/AlertsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900 bg-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/details" element={<ForestDetails />} />
          <Route path="/history" element={<History />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
