export default function UploadPanel() {
  return (
    <div
      style={{
        border: "2px solid #f0e9ff",
        borderRadius: "16px",
        padding: "15px",
        backgroundColor: "#fffaff",
        boxShadow: "0 2px 8px rgba(180,160,255,0.15)",
        textAlign: "center"
      }}
    >
      {/* upload panel header */}
      <p style={{ color: "#7c6aff", marginBottom: "10px" }}>
        upload an animal photo
      </p>
      {/* file input for image upload */}
      <input
        type="file"
        accept="image/*"
        style={{
          backgroundColor: "#f5f0ff",
          borderRadius: "10px",
          border: "1px solid #d8ccff",
          padding: "6px 8px",
          width: "100%"
        }}
      />
    </div>
  );
}