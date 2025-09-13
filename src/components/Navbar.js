import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">YP4Connect</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {user && (
            <>
              <li className="nav-item">
                <Link
                  to="/chat"
                  className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
                >
                  ChatRoom
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/announcements"
                  className={`nav-link ${location.pathname === '/announcements' ? 'active' : ''}`}
                >
                  Announcements
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="btn btn-success btn-sm me-2">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-outline-info btn-sm">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;