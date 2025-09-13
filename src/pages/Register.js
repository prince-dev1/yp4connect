// src/pages/Register.js
import React, { useState } from 'react';
import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Reuse the same CSS as Login
import { Link } from 'react-router-dom';
import { ref, set } from 'firebase/database';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save additional user info to Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        firstName,
        lastName,
        phone,
        email,
        createdAt: Date.now(),
      });
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg auth-card text-white">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
             Already have an account? <Link to="/" className="text-info">Login</Link>
            </p>
      </div>
    </div>
  );
}

export default Register;
