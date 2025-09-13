import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './auth.css';



function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage(`Password reset email sent to ${email}. Check your inbox.`);
        } catch (error) {
            setMessage(error.message);
        }
    };
    return (
        <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg auth-card text-white">
            <h2 className="text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleRequest}>
                <input 
                type="email" 
                className="form-control mb-3" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                
                <button type="submit" className="btn btn-warning w-100">Reset Password</button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
            <p className="mt-3 text-center">
                Forgot your password? <Link to="/login" className="text-info">Reset</Link>
            </p>
        </div>
    </div>
);
}

export default ForgotPassword;