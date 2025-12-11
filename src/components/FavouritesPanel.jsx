import { useState, useEffect } from "react";

export default function FavouritesPanel({ favourites, onClear, onSelect, onRemove }) {
  const hasAny = favourites.length > 0;
  const [top, setTop] = useState(90);

  useEffect(() => {
    function handleScroll() {
      const rawTop = 90 - window.scrollY;
      const clampedTop = Math.max(24, rawTop);
      setTop(clampedTop);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClearClick() {
    if (!hasAny || !onClear) return;
    if (window.confirm("clear all favourites?")) {
      onClear();
    }
  }

  function handleRemove(name) {
    if (!onRemove) return;
    onRemove(name);
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "24px",
        top: `${top}px`,
        zIndex: 1000,
        padding: "12px 14px",
        borderRadius: "16px",
        background: "#f9f6ff",
        border: "1px solid #e3d7ff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "6px",
        maxWidth: "260px",
        transition: "top 0.15s ease-out"
      }}
    >
      {/* header row with label + clear */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "8px"
        }}
      >
        <span
          style={{
            fontWeight: 600,
            color: "#7c6aff",
            textTransform: "lowercase"
          }}
        >
          favourites:
        </span>

        {hasAny && (
          <button
            type="button"
            onClick={handleClearClick}
            style={{
              border: "none",
              padding: "2px 10px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              background: "#e6ddff",
              color: "#5645a8",
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#ffd6db";
              e.currentTarget.style.color = "#a33b52";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#e6ddff";
              e.currentTarget.style.color = "#5645a8";
            }}
          >
            clear
          </button>
        )}
      </div>

      {/* favourites list */}
      {hasAny ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            width: "100%"
          }}
        >
          {favourites.map(name => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#e6ddff",
                padding: "4px 10px 4px 12px",
                borderRadius: "999px",
                fontSize: "0.9rem",
                color: "#4e3f96",
                cursor: "pointer",
                transition: "background 0.15s ease"
              }}
              onClick={() => onSelect && onSelect(name)}
              onMouseEnter={e => (e.currentTarget.style.background = "#f2e8ff")}
              onMouseLeave={e => (e.currentTarget.style.background = "#e6ddff")}
            >
              {name}

              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(name);
                }}
                aria-label={`remove ${name}`}
                style={{
                  border: "none",
                  background: "#d8caff",
                  color: "#5a4a9a",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  fontSize: "0.65rem",
                  lineHeight: "16px",
                  textAlign: "center",
                  padding: 0,
                  cursor: "pointer",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#ffcccf")}
                onMouseLeave={e => (e.currentTarget.style.background = "#d8caff")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <span
          style={{
            fontSize: "0.8rem",
            color: "#8a80b8"
          }}
        >
          tap the ♥ on a card to save an animal here.
        </span>
      )}
    </div>
  );
}
