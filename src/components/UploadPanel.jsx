import { useState } from "react";

export default function UploadPanel() {
  // state for storing uploaded image preview url
  const [preview, setPreview] = useState(null);

  // handles file upload and creates preview url
  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div
      style={{
        border: "2px solid #f0e9ff",
        borderRadius: "14px",
        padding: "12px",
        backgroundColor: "#fffaff",
        boxShadow: "0 2px 6px rgba(180,160,255,0.12)",
        textAlign: "center",
        width: "100%"
      }}
    >
      {/* upload panel header */}
      <p style={{ color: "#7c6aff", marginBottom: "8px" }}>
        upload an animal photo
      </p>

      {/* file input for image upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{
          backgroundColor: "#f5f0ff",
          borderRadius: "8px",
          border: "1px solid #d8ccff",
          padding: "5px 7px",
          width: "100%"
        }}
      />

      {/* image preview container */}
      {preview && (
        <div
          style={{
            marginTop: "12px",
            width: "100%",
            aspectRatio: "4 / 5",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid #e8ddff",
            background: "#f9f6ff"
          }}
        >
          {/* preview image display */}
          <img
            src={preview}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      )}
    </div>
  );
}