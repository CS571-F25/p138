export default function AnimalCard({ a, puppyIndex, setPuppyIndex }) {
  // navigates to next image in array, loops back to start at end
  const next = () => setPuppyIndex((puppyIndex + 1) % a.images.length);
  // navigates to previous image in array, loops to end at start
  const prev = () =>
    setPuppyIndex((puppyIndex - 1 + a.images.length) % a.images.length);

  return (
    <div
      style={{
        border: "2px solid #f0e9ff",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#fffaff",
        boxShadow: "0 2px 8px rgba(180,160,255,0.15)",
        transition: "transform 0.2s ease",
        position: "relative"
      }}
      // adds hover effect for interactive feedback
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* image section with navigation for multiple images */}
      {a.images ? (
        <div style={{ position: "relative" }}>
          {/* displays current image from images array */}
          <img
            src={a.images[puppyIndex]}
            alt={a.name}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              objectPosition: a.objectPosition || "center",
              borderBottom: "1px solid #f0e9ff",
              transition: "opacity 0.4s ease"
            }}
          />

          {/* left navigation button for previous image */}
          <button
            onClick={prev}
            style={{
              position: "absolute",
              top: "50%",
              left: "8px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              color: "#7c6aff",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            ←
          </button>

          {/* right navigation button for next image */}
          <button
            onClick={next}
            style={{
              position: "absolute",
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              color: "#7c6aff",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            →
          </button>
        </div>
      ) : (
        // fallback for single image display
        <img
          src={a.image}
          alt={a.name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            objectPosition:
              a.objectPosition ||
              (a.name === "tiger"
                ? "center 40%"
                : a.name === "penguin"
                ? "center 30%"
                : "center"),
            borderBottom: "1px solid #f0e9ff"
          }}
        />
      )}

      {/* animal information section */}
      <div style={{ padding: "12px 16px" }}>
        {/* animal name header */}
        <h3
          style={{
            margin: "0 0 6px 0",
            color: "#7c6aff",
            fontSize: "1.2rem",
            textTransform: "lowercase"
          }}
        >
          {a.name}
        </h3>

        {/* animal category information */}
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          category:{" "}
          {Array.isArray(a.category) ? a.category.join(", ") : a.category}
        </p>

        {/* animal habitat information */}
        <p style={{ margin: 0, fontSize: "0.9rem" }}>habitat: {a.habitat}</p>

        {/* animal diet information */}
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          eats: {a.diet.join(", ")}
        </p>
      </div>
    </div>
  );
}