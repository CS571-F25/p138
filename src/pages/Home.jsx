import React, { useState, useEffect } from "react";
import FilterPanel from "../components/FilterPanel";
import UploadPanel from "../components/UploadPanel";
import AnimalGrid from "../components/AnimalGrid";
import FavouritesPanel from "../components/FavouritesPanel";
import AnimalModal from "../components/AnimalModal";
import SearchBar from "../components/SearchBar";

const FAV_KEY = "p138-favourites";

export default function Home() {
  // filter + state
  const [habitat, setHabitat] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedTextures, setSelectedTextures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [puppyIndex, setPuppyIndex] = useState(0);

  // search query (for SearchBar)
  const [query, setQuery] = useState("");

  // favourites (persistent)
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites]);

  function toggleFavourite(name) {
    setFavourites(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  }

  function clearFavourites() {
    setFavourites([]);
  }

  // modal: we just track the animal NAME here
  const [modalName, setModalName] = useState(null);

  function openAnimal(name) {
    setModalName(name);
  }

  // upload panel scroll position (same slide-up behaviour as favourites)
  const [uploadTop, setUploadTop] = useState(90);

  useEffect(() => {
    function handleScroll() {
      const rawTop = 90 - window.scrollY;
      const clampedTop = Math.max(24, rawTop);
      setUploadTop(clampedTop);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // load google font once
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Quicksand', sans-serif",
        background: "linear-gradient(180deg, #fef6f9 0%, #f5faff 100%)",
        minHeight: "100vh",
        padding: "60px",
        color: "#444"
      }}
    >
      {/* header */}
      <header style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "3rem",
            color: "#7c6aff",
            marginBottom: "14px",
            textTransform: "lowercase"
          }}
        >
          animal encyclopedia
        </h1>
        <p style={{ fontSize: "1.3rem", color: "#888" }}>
          ✿ discover the world's diverse creatures ✿
        </p>
      </header>

      {/* main card */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "28px",
          padding: "48px",
          boxShadow: "0 10px 26px rgba(200,200,255,0.35)"
        }}
      >
        {/* search bar */}
        <SearchBar query={query} setQuery={setQuery} />

        {/* filters */}
        <div style={{ marginBottom: "40px" }}>
          <FilterPanel
            habitat={habitat}
            setHabitat={setHabitat}
            category={category}
            setCategory={setCategory}
            selectedFoods={selectedFoods}
            setSelectedFoods={setSelectedFoods}
            selectedPatterns={selectedPatterns}
            setSelectedPatterns={setSelectedPatterns}
            selectedTextures={selectedTextures}
            setSelectedTextures={setSelectedTextures}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        </div>

        {/* floating favourites pill (right side, handled by its own component) */}
        <FavouritesPanel
          favourites={favourites}
          onClear={clearFavourites}
          onSelect={openAnimal}
        />

        {/* grid: cards can also open the same modal by name */}
        <AnimalGrid
          habitat={habitat}
          category={category}
          selectedFoods={selectedFoods}
          selectedPatterns={selectedPatterns}
          selectedTextures={selectedTextures}
          selectedColors={selectedColors}
          puppyIndex={puppyIndex}
          setPuppyIndex={setPuppyIndex}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          onOpen={openAnimal}
          query={query}
        />
      </div>

      {/* floating upload box in top-left with slide-up behaviour */}
      <div
        style={{
          position: "fixed",
          left: "24px",
          top: `${uploadTop}px`,
          zIndex: 900,
          width: "260px",
          transition: "top 0.15s ease-out"
        }}
      >
        <UploadPanel />
      </div>

      {/* modal: AnimalModal is responsible for looking the animal up by name (no-op right now if name not wired) */}
      <AnimalModal name={modalName} onClose={() => setModalName(null)} />
    </div>
  );
}
