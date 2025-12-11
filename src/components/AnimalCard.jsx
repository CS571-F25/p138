/*jshint esversion: 6 */

import { useState } from "react";
import AnimalImage from "./AnimalImage";
import AnimalWikiInfo from "./AnimalWikiInfo";

export default function AnimalCard({
  a,
  puppyIndex,
  setPuppyIndex,
  isFavourite,
  toggleFavourite,
  isCompared,
  onToggleCompare
}) {
  const [expanded, setExpanded] = useState(false);

  const next = () => setPuppyIndex((puppyIndex + 1) % a.images.length);
  const prev = () =>
    setPuppyIndex((puppyIndex - 1 + a.images.length) % a.images.length);

  // figure out what to say for the image credit
  function getImageCredit() {
    // pomeranian / multi-image animals: use current image file
    if (Array.isArray(a.images) && a.images.length > 0) {
      const src = a.images[puppyIndex] || a.images[0];
      if (!src) return null;

      // for local files just show the filename-ish bit
      let label = src;
      try {
        const url = new URL(src, window.location.origin);
        label = url.pathname.split("/").filter(Boolean).slice(-1)[0] || url.hostname;
      } catch {
        // if URL constructor hates it, leave label as-is
      }

      return { label, href: src, isWiki: false };
    }

    // no explicit image: this card will use AnimalImage which,
    // in my setup, fetches from wikipedia
    if (!a.image || a.image.trim() === "") {
      return { label: "wikipedia", href: null, isWiki: true };
    }

    // explicit image url
    let label = a.image;
    try {
      const url = new URL(a.image);
      label = url.hostname.replace(/^www\./, "");
    } catch {
      // if it's not a full url, just leave it as whatever it is
    }

    return { label, href: a.image, isWiki: false };
  }

  const credit = getImageCredit();

  function handleCompareClick(e) {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare();
    }
  }

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      style={{
        border: "2px solid #f0e9ff",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "#fffaff",
        boxShadow: "0 3px 12px rgba(180,160,255,0.18)",
        transition: "transform 0.2s ease",
        position: "relative",
        cursor: "pointer"
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* favourite heart button */}
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          toggleFavourite(a.name);
        }}
        aria-label={
          isFavourite
            ? `remove ${a.name} from favourites`
            : `add ${a.name} to favourites`
        }
        aria-pressed={isFavourite}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          border: "none",
          borderRadius: "999px",
          padding: "6px 10px",
          cursor: "pointer",
          backgroundColor: "rgba(255,255,255,0.95)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.18)",
          fontSize: "1.1rem",
          color: isFavourite ? "#ff5b9a" : "#b7a8ff"
        }}
      >
        {isFavourite ? "♥" : "♡"}
      </button>

      {/* image section */}
      {a.images ? (
        <div style={{ position: "relative" }}>
          <img
            src={a.images[puppyIndex]}
            alt={a.name}
            style={{
              width: "100%",
              height: "280px",
              objectFit: "cover",
              objectPosition: a.objectPosition || "center",
              borderBottom: "1px solid #f0e9ff",
              transition: "opacity 0.4s ease"
            }}
          />

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              prev();
            }}
            aria-label="previous photo"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: "#7c6aff",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
            }}
          >
            ←
          </button>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              next();
            }}
            aria-label="next photo"
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: "#7c6aff",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
            }}
          >
            →
          </button>
        </div>
      ) : (
        <AnimalImage animal={a} height={280} />
      )}

      {/* basic info */}
      <div style={{ padding: "16px 20px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            color: "#7c6aff",
            fontSize: "1.3rem",
            textTransform: "lowercase"
          }}
        >
          {a.name}
        </h3>

        <p style={{ margin: 0, fontSize: "1rem" }}>
          category: {Array.isArray(a.category) ? a.category.join(", ") : a.category}
        </p>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          habitat: {a.habitat}
        </p>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          eats: {a.diet.join(", ")}
        </p>

        {onToggleCompare && (
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <button
              type="button"
              onClick={handleCompareClick}
              aria-pressed={!!isCompared}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "4px 10px",
                fontSize: "0.8rem",
                cursor: "pointer",
                backgroundColor: isCompared ? "#ffd6e6" : "#e6ddff",
                color: isCompared ? "#b3395a" : "#5645a8",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                textTransform: "lowercase"
              }}
            >
              {isCompared ? "in compare" : "compare"}
            </button>
          </div>
        )}
      </div>

      {/* expanded details section when card is clicked */}
      {expanded && (
        <div
          style={{
            padding: "0 20px 16px 20px",
            borderTop: "1px dashed #e4dcff",
            background: "#fdfbff"
          }}
        >
          <p
            style={{
              margin: "10px 0 6px 0",
              fontSize: "0.9rem",
              color: "#7c6aff",
              textTransform: "lowercase",
              fontWeight: 600
            }}
          >
            quick details
          </p>

          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "0.9rem",
              color: "#555"
            }}
          >
            size: <b>{a.size}</b>, pattern: <b>{a.pattern}</b>, texture:{" "}
            <b>{a.texture}</b>
          </p>

          {/* inline wiki summary for this animal */}
          <AnimalWikiInfo name={a.name} />

          {/* image credit / citation */}
          {credit && (
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "0.8rem",
                color: "#9a8fd4"
              }}
            >
              image from:{" "}
              {credit.href && !credit.isWiki ? (
                <a
                  href={credit.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#7c6aff", textDecoration: "underline" }}
                  onClick={e => e.stopPropagation()}
                >
                  {credit.label}
                </a>
              ) : (
                <span style={{ color: "#7c6aff" }}>{credit.label}</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
