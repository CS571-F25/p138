import React from "react";

export default function SizeAdjuster({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange
}) {
  function clampAndSet(next) {
    let v = Number(next);
    if (isNaN(v)) v = min;
    if (v < min) v = min;
    if (v > max) v = max;
    onChange(v);
  }

  function handleMinus() {
    clampAndSet((value ?? 0) - step);
  }

  function handlePlus() {
    clampAndSet((value ?? 0) + step);
  }

  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.8rem",
          marginBottom: "2px"
        }}
      >
        <span style={{ textTransform: "lowercase", color: "#777" }}>
          {label}
        </span>
        <span style={{ color: "#777" }}>{value}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        <button type="button" onClick={handleMinus} style={stepButtonStyle}>
          –
        </button>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => clampAndSet(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="button" onClick={handlePlus} style={stepButtonStyle}>
          +
        </button>
      </div>
    </div>
  );
}

const stepButtonStyle = {
  width: "26px",
  height: "24px",
  borderRadius: "999px",
  border: "1px solid #ded3ff",
  background: "#faf7ff",
  fontSize: "0.9rem",
  cursor: "pointer"
};
