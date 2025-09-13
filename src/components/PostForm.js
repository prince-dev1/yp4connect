import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

function PostForm({ user }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text && !image) return;

    setLoading(true);

    let imageUrl = null;

    try {
      // Upload image if selected
      if (image) {
        const imgRef = storageRef(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(imgRef, image);
        imageUrl = await getDownloadURL(imgRef);
      }

      // Save post to Realtime Database
      await push(ref(database, 'posts'), {
        text,
        imageUrl,
        author: user?.email || "Anonymous",
        timestamp: Date.now()
      });

      setText('');
      setImage(null);
    } catch (err) {
      alert("Error posting: " + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePost} className="mb-4 p-3 border rounded bg-light">
      <textarea
        className="form-control mb-2"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default PostForm;