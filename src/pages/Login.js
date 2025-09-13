// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import './auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg auth-card text-white">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            value={password}
             onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
           />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" className="text-info">Register</Link>
        </p>
        <p className="text-center mt-2">
        <Link to="/forgot-password" className="text-warning">Forgot Password?</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
