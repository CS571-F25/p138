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
          this site is a small pastel animal encyclopedia with searchable cards,
          trait filters, and quick facts pulled in from wikipedia. each animal
          card shows an image, basic traits, and a short summary so you can
          explore different species at a glance.
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
        <p style={{ fontSize: "1.05rem", marginBottom: "14px" }}>
          the home page includes a search bar, a multi-section filter panel
          (habitat, category, diet, patterns, textures, and colours), and a
          paginated grid of animals. you can favourite animals with the heart
          button, see them in a floating favourites pill, and open a detail
          modal for a cleaner view of their traits and wiki blurb.
        </p>

        <p style={{ fontSize: "1.05rem", marginBottom: "20px" }}>
          there is also a draggable comparison drawer to highlight similarities
          and differences between two animals, plus an upload panel that lets
          you drop in your own animal photo for easy referencing. a separate
          “build your own animal” page lets you play with simple customisation
          controls for animal generation.
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
          built using react with react router for page navigation and react
          bootstrap for the top navigation bar. the grid, filters, favourites,
          comparison drawer, upload panel, and wikipedia integrations are all
          custom components. the app is bundled with vite and deployed through
          github pages.
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
        <p style={{ fontSize: "1.05rem", marginBottom: "28px" }}>
          future additions may include more animals and habitats, extra traits
          for filtering, better mobile layout tweaks, and more handdrawn assets
          on the build page so custom animals can be more unique.
        </p>

        {/* attribution section */}
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#7c6aff",
            textTransform: "lowercase",
            marginBottom: "12px"
          }}
        >
          asset credits
        </h2>

        <p style={{ fontSize: "1.05rem" }}>
          butterflywings.png, batwings.png, angelwings.png, devilwings.png, and halo.png as well as the special backgrounds were sourced from huaban.com.
        </p>
      </div>
    </div>
  );
}
