import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(database, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedPosts = Object.entries(data).map(([id, post]) => ({
          id,
          ...post,
        }));
        // Show newest first
        setPosts(loadedPosts.reverse());
      } else {
        setPosts([]);
      }
    });
  }, []);

  return (
    <div>
      {posts.length === 0 && <p className="text-center">No posts yet</p>}
      {posts.map((post) => (
        <div key={post.id} className="card mb-3 shadow-sm">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="card-img-top"
              style={{ maxHeight: 300, objectFit: 'cover' }}
            />
          )}
          <div className="card-body">
            <p className="card-text">{post.text}</p>
            <small className="text-muted">
              Posted by {post.author} on {new Date(post.timestamp).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;