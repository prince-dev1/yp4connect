import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
         {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected Pages */}
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard />
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;