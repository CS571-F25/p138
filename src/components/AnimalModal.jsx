import AnimalWikiInfo from "./AnimalWikiInfo";
import AnimalImage from "./AnimalImage";

export default function AnimalModal({ animal, onClose }) {
  if (!animal) return null;

  const hasImagesArray =
    Array.isArray(animal.images) && animal.images.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${animal.name} details`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "22px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
          padding: "22px 24px 24px 24px",
          width: "min(560px, 95vw)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "'Quicksand', sans-serif"
        }}
      >
        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            border: "none",
            background: "#f3ecff",
            borderRadius: "999px",
            padding: "3px 9px",
            fontSize: "0.9rem",
            cursor: "pointer",
            color: "#6b5ad8",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
          }}
        >
          ✕
        </button>

        {/* header */}
        <h2
          style={{
            margin: "4px 36px 14px 4px",
            fontSize: "1.7rem",
            color: "#7c6aff",
            textTransform: "lowercase"
          }}
        >
          {animal.name}
        </h2>

        {/* main content row */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "flex-start",
            marginBottom: "8px"
          }}
        >
          {/* image block */}
          <div
            style={{
              flex: "0 0 240px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "2px solid #f0e9ff",
              background: "#f9f6ff"
            }}
          >
            {hasImagesArray ? (
              <img
                src={animal.images[0]}
                alt={animal.name}
                style={{
                  display: "block",
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  objectPosition: animal.objectPosition || "center"
                }}
              />
            ) : (
              <AnimalImage
                animal={animal}
                height={280}
                withBorderBottom={false}
              />
            )}
          </div>

          {/* facts */}
          <div
            style={{
              flex: 1,
              fontSize: "0.95rem",
              color: "#555",
              lineHeight: 1.5,
              maxHeight: "280px",
              overflowY: "auto",
              paddingRight: "4px"
            }}
          >
            <p style={{ margin: "0 0 6px 0" }}>
              <strong>category:</strong>{" "}
              {Array.isArray(animal.category)
                ? animal.category.join(", ")
                : animal.category}
            </p>
            <p style={{ margin: "0 0 6px 0" }}>
              <strong>habitat:</strong> {animal.habitat}
            </p>
            <p style={{ margin: "0 0 6px 0" }}>
              <strong>diet:</strong> {animal.diet.join(", ")}
            </p>
            <p style={{ margin: "0 0 6px 0" }}>
              <strong>size:</strong> {animal.size}
            </p>
            <p style={{ margin: "0 0 6px 0" }}>
              <strong>pattern:</strong> {animal.pattern}
            </p>
            <p style={{ margin: 0 }}>
              <strong>texture:</strong> {animal.texture}
            </p>
          </div>
        </div>

        {/* wikipedia section */}
        <AnimalWikiInfo name={animal.name} />
      </div>
    </div>
  );
}
