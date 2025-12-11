export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}) {
  if (!totalPages || totalPages <= 1) return null;

  function goTo(page) {
    if (page < 1 || page > totalPages) return;
    onPageChange && onPageChange(page);
  }

  return (
    <div
      style={{
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        fontFamily: "'Quicksand', sans-serif"
      }}
    >
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          borderRadius: "999px",
          border: "1px solid #d8ccff",
          background: currentPage === 1 ? "#f3efff" : "#f8f4ff",
          padding: "4px 10px",
          fontSize: "0.85rem",
          color: "#7c6aff",
          cursor: currentPage === 1 ? "default" : "pointer"
        }}
      >
        previous
      </button>

      <span
        style={{
          fontSize: "0.9rem",
          color: "#777"
        }}
      >
        page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          borderRadius: "999px",
          border: "1px solid #d8ccff",
          background: currentPage === totalPages ? "#f3efff" : "#f8f4ff",
          padding: "4px 10px",
          fontSize: "0.85rem",
          color: "#7c6aff",
          cursor: currentPage === totalPages ? "default" : "pointer"
        }}
      >
        next
      </button>
    </div>
  );
}
