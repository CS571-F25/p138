import { useState, useRef, useEffect } from "react";

export default function CompareDrawer({ selectedAnimals, onClear }) {
  if (!selectedAnimals || selectedAnimals.length < 2) {
    return null;
  }

  // only ever compare the first two
  const animals = selectedAnimals.slice(0, 2);

  const traitDefs = [
    [
      "category",
      a =>
        Array.isArray(a.category) ? a.category.join(", ") : a.category
    ],
    ["habitat", a => a.habitat],
    ["diet", a => a.diet.join(", ")],
    ["size", a => a.size],
    ["pattern", a => a.pattern],
    ["texture", a => a.texture],
    ["colours", a => a.colors.join(", ")]
  ];

  // drag state
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(null); // { top, left } once dragged

  function handleMouseDown(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDragging(true);
    e.preventDefault();
  }

  useEffect(() => {
    if (!dragging) return;

    function handleMove(e) {
      setPosition({
        top: e.clientY - offset.y,
        left: e.clientX - offset.x
      });
    }

    function handleUp() {
      setDragging(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, offset]);

  // helper to render per-token highlighting
  function renderTokensRow(label, getter) {
    const raw0 = String(getter(animals[0]));
    const raw1 = String(getter(animals[1]));

    const tokens0 = raw0
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);
    const tokens1 = raw1
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const shared = tokens0.filter(t => tokens1.includes(t));

    function renderTokens(tokens) {
      return tokens.map((tok, idx) => {
        const isShared = shared.includes(tok);
        const colour = isShared ? "#1b7a34" : "#b3261e";
        const weight = isShared ? 600 : 500;

        return (
          <span key={tok + idx} style={{ color: colour, fontWeight: weight }}>
            {tok}
            {idx < tokens.length - 1 ? ", " : ""}
          </span>
        );
      });
    }

    return (
      <tr key={label}>
        <td
          style={{
            padding: "3px 6px",
            color: "#777",
            textTransform: "lowercase"
          }}
        >
          {label}
        </td>
        <td
          style={{
            padding: "3px 6px",
            textAlign: "center",
            whiteSpace: "nowrap"
          }}
        >
          {renderTokens(tokens0)}
        </td>
        <td
          style={{
            padding: "3px 6px",
            textAlign: "center",
            whiteSpace: "nowrap"
          }}
        >
          {renderTokens(tokens1)}
        </td>
      </tr>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 16,
        zIndex: 1500,
        pointerEvents: "none" // background stays clickable
      }}
    >
      <div
        ref={cardRef}
        style={{
          pointerEvents: "auto",
          maxWidth: "720px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.97)",
          borderRadius: "18px",
          border: "2px solid #e3d7ff",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.18)",
          fontFamily: "'Quicksand', sans-serif",
          padding: "12px 18px 14px 18px",
          position: position ? "fixed" : "relative",
          top: position ? position.top : "auto",
          left: position ? position.left : "auto",
          cursor: dragging ? "grabbing" : "default"
        }}
      >
        {/* header row (drag handle) */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
            cursor: "grab",
            userSelect: "none"
          }}
        >
          <span
            style={{
              fontWeight: 600,
              color: "#7c6aff",
              textTransform: "lowercase"
            }}
          >
            compare animals
          </span>

          <button
            type="button"
            onClick={onClear}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "3px 11px",
              fontSize: "0.78rem",
              background: "#e6ddff",
              color: "#5645a8",
              cursor: "pointer"
            }}
          >
            clear
          </button>
        </div>

        {/* comparison table */}
        <div
          style={{
            overflowX: "auto"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.86rem",
              tableLayout: "fixed"
            }}
          >
            <colgroup>
              <col style={{ width: "26%" }} />
              <col style={{ width: "37%" }} />
              <col style={{ width: "37%" }} />
            </colgroup>

            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "4px 6px",
                    color: "#999",
                    textTransform: "lowercase"
                  }}
                >
                  trait
                </th>
                {animals.map(a => (
                  <th
                    key={a.name}
                    style={{
                      textAlign: "center",
                      padding: "4px 6px",
                      color: "#7c6aff",
                      textTransform: "lowercase",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {a.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {traitDefs.map(([label, getter]) =>
                renderTokensRow(label, getter)
              )}
            </tbody>
          </table>
        </div>

        {/* legend */}
        <div
          style={{
            marginTop: "6px",
            fontSize: "0.75rem",
            color: "#888",
            display: "flex",
            gap: "10px"
          }}
        >
          <span style={{ color: "#1b7a34" }}>● same</span>
          <span style={{ color: "#b3261e" }}>● different</span>
        </div>
      </div>
    </div>
  );
}
