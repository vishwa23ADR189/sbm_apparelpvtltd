import React, { useState } from "react";
import axios from "axios";

function VirtualTryOn() {
  const [userImage, setUserImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userImage || !clothImage) {
      alert("Upload both user and cloth images!");
      return;
    }

    const formData = new FormData();
    formData.append("userImage", userImage);
    formData.append("clothImage", clothImage);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/tryon", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.data?.[0] || null);
    } catch (err) {
      console.error(err);
      alert("Error generating try-on image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Upload Your Image: </label>
          <input type="file" accept="image/*" onChange={(e) => setUserImage(e.target.files[0])} />
        </p>
        <p>
          <label>Upload Cloth Image: </label>
          <input type="file" accept="image/*" onChange={(e) => setClothImage(e.target.files[0])} />
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Generate Try-On"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🖼️ Result:</h3>
          <img src={result} alt="Try-On Result" style={{ width: "400px", border: "1px solid #ccc" }} />
        </div>
      )}
    </div>
  );
}



export default VirtualTryOn;
