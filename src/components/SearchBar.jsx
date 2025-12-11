export default function SearchBar({ query, setQuery }) {
  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search by name (e.g. tiger, penguin)"
        aria-label="search animals by name"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "8px 12px",
          borderRadius: "999px",
          border: "1px solid #d8ccff",
          backgroundColor: "#faf7ff",
          fontSize: "0.95rem",
          color: "#444",
          outline: "none",
          boxShadow: "0 2px 6px rgba(180,160,255,0.16)"
        }}
      />
    </div>
  );
}
