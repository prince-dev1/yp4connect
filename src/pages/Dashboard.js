import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import ImageUpload from '../components/ImageUpload';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const handleNewPost = (imageUrl) => {
        setPosts([...posts, { imageUrl }]);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
      } else {
        setUser(currentUser);
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="dashboard-bg text-white min-vh-100 d-flex flex-column align-items-center p-3">
      {showWelcome && (
        <div className="text-center dashboard-hero mb-4">
          <h1 className="display-4">Welcome, let's connect!</h1>
        </div>
      )}
      <div>
      <h2>Dashboard</h2>

      {/* Add Upload Button */}
      <ImageUpload onUpload={handleNewPost} />

      {/* Show uploaded images */}
      <div style={{ marginTop: "20px" }}>
        {posts.map((post, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <img src={post.imageUrl} alt="post" width="300" />
          </div>
        ))}

      <div className="posts-container w-100" style={{ maxWidth: '600px' }}>
        <PostForm user={user} />
        <PostList />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;