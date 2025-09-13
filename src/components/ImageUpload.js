import React, { useState } from "react";
import axios from "axios";

function ImageUpload({ onUpload }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yp4_preset"); // your unsigned preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;
      onUpload(imageUrl); // send uploaded image URL to parent (dashboard)
      setLoading(false);
    } catch (err) {
      console.error("Upload failed", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" />
      {preview && (
        <div>
          <img src={preview} alt="preview" width="200" style={{ marginTop: "10px" }} />
        </div>
      )}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default ImageUpload;