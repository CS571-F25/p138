import React from "react";

export default function PositionAdjuster({ label, onChange }) {
  // onChange(dx, dy) where dx,dy are small unit steps
  function move(dx, dy) {
    if (!onChange) return;
    onChange(dx, dy);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px"
      }}
    >
      <label
        style={{
          flexShrink: 0,
          width: "80px",
          fontSize: "0.8rem",
          textTransform: "lowercase",
          color: "#777"
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 20px)",
          gridTemplateRows: "repeat(3, 20px)",
          gap: "2px",
          alignItems: "center",
          justifyItems: "center"
        }}
      >
        <div />
        <button
          type="button"
          onClick={() => move(0, -1)}
          style={arrowButtonStyle}
        >
          ↑
        </button>
        <div />
        <button
          type="button"
          onClick={() => move(-1, 0)}
          style={arrowButtonStyle}
        >
          ←
        </button>
        <div />
        <button
          type="button"
          onClick={() => move(1, 0)}
          style={arrowButtonStyle}
        >
          →
        </button>
        <div />
        <button
          type="button"
          onClick={() => move(0, 1)}
          style={arrowButtonStyle}
        >
          ↓
        </button>
        <div />
      </div>
    </div>
  );
}

const arrowButtonStyle = {
  width: "20px",
  height: "20px",
  borderRadius: "4px",
  border: "1px solid #ded3ff",
  background: "#faf7ff",
  fontSize: "0.75rem",
  lineHeight: 1,
  padding: 0,
  cursor: "pointer"
};
