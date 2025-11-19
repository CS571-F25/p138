export default function About() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Quicksand', sans-serif",
        color: "#555",
        background: "linear-gradient(180deg, #fef6f9 0%, #f5faff 100%)",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 6px 16px rgba(200,200,255,0.3)"
        }}
      >
        {/* about page header */}
        <h1
          style={{
            fontSize: "2rem",
            color: "#7c6aff",
            textTransform: "lowercase",
            marginBottom: "20px"
          }}
        >
          about
        </h1>

        {/* project description */}
        <p style={{ fontSize: "1.05rem", marginBottom: "20px" }}>
          this site displays animal information with filtering options for
          habitat, category, and diet. each animal has its own card with an
          image and basic traits.
        </p>

        {/* features section header */}
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#7c6aff",
            textTransform: "lowercase",
            marginBottom: "12px"
          }}
        >
          features
        </h2>

        {/* features description */}
        <p style={{ fontSize: "1.05rem", marginBottom: "20px" }}>
          current features include a searchable grid of animals, a filtering
          panel, and image handling for different species. additional
          components and layouts are being added over time.
        </p>

        {/* tools section header */}
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#7c6aff",
            textTransform: "lowercase",
            marginBottom: "12px"
          }}
        >
          tools
        </h2>

        {/* tools and technologies used */}
        <p style={{ fontSize: "1.05rem", marginBottom: "20px" }}>
          built using react, react router, react bootstrap, and vite. deployment
          is handled through github pages.
        </p>

        {/* upcoming features section header */}
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#7c6aff",
            textTransform: "lowercase",
            marginBottom: "12px"
          }}
        >
          upcoming
        </h2>

        {/* future development plans */}
        <p style={{ fontSize: "1.05rem" }}>
          future additions include expanded filtering options, additional
          species, and a build-your-own-animal page.
        </p>
      </div>
    </div>
  );
}