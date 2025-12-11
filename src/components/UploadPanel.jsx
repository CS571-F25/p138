import { useState } from "react";

export default function UploadPanel() {
  const [preview, setPreview] = useState(null);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
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
      <p style={{ color: "#7c6aff", marginBottom: "8px" }}>
        upload an animal photo
      </p>

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

      {preview && (
        <div
          style={{
            marginTop: "12px",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid #e8ddff",
            background: "#f9f6ff"
          }}
        >
          <img
            src={preview}
            alt="uploaded animal"
            style={{
              width: "100%",
              height: "auto",      // ← auto height!
              display: "block",
              objectFit: "contain" // ← ensures full image visible
            }}
          />
        </div>
      )}
    </div>
  );
}
