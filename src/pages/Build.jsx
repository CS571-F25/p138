import { useState } from "react";

export default function Build() {
  // state for animal customization options
  const [ears, setEars] = useState("pointy");
  const [tail, setTail] = useState("fluffy");
  const [color, setColor] = useState("white");

  return (
    <div
      style={{
        fontFamily: "'Quicksand', sans-serif",
        background: "linear-gradient(180deg, #fef6f9 0%, #f5faff 100%)",
        minHeight: "100vh",
        padding: "40px",
        color: "#555"
      }}
    >
      {/* page header */}
      <h1
        style={{
          fontSize: "2rem",
          color: "#7c6aff",
          textTransform: "lowercase",
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        build your own animal
      </h1>

      {/* main content container */}
      <div
        style={{
          maxWidth: "1100px",        // controlled width for layout
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px 50px",      // reduced horizontal padding
          boxShadow: "0 6px 16px rgba(200,200,255,0.3)",
          marginTop: "-10px"         // shifts container upward slightly
        }}
      >
        {/* flex layout for preview and controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            alignItems: "flex-start"
          }}
        >
          {/* animal preview area */}
          <div
            style={{
              width: "420px",
              height: "500px",
              borderRadius: "16px",
              border: "2px dashed #d3caff",
              background: "#faf7ff"
            }}
          />

          {/* customization controls panel */}
          <div
            style={{
              padding: "25px",
              width: "350px",
              borderRadius: "16px",
              background: "#fffaff",
              border: "2px solid #f0e9ff",
              boxShadow: "0 2px 8px rgba(180,160,255,0.15)"
            }}
          >
            {/* ear type selection */}
            <label>ears:</label>
            <select value={ears} onChange={(e) => setEars(e.target.value)}>
              <option>pointy</option>
              <option>round</option>
              <option>floppy</option>
            </select>

            <br /><br />

            {/* tail type selection */}
            <label>tail:</label>
            <select value={tail} onChange={(e) => setTail(e.target.value)}>
              <option>long</option>
              <option>short</option>
              <option>fluffy</option>
            </select>

            <br /><br />

            {/* color selection */}
            <label>color:</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option>white</option>
              <option>brown</option>
              <option>black</option>
            </select>

            <br /><br />

            {/* current selection summary */}
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "12px",
                background: "#f5f0ff"
              }}
            >
              <p style={{ margin: 0 }}>
                your custom animal:
                <br />
                ears: <b>{ears}</b><br />
                tail: <b>{tail}</b><br />
                color: <b>{color}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}