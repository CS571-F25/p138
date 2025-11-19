import React, { useState, useEffect } from "react";
import FilterPanel from "../components/FilterPanel";
import UploadPanel from "../components/UploadPanel";
import AnimalGrid from "../components/AnimalGrid";

export default function Home() {
  // filter state management
  const [habitat, setHabitat] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);

  // additional filter states for patterns, textures, and colors
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedTextures, setSelectedTextures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // state for tracking current image index in animal cards
  const [puppyIndex, setPuppyIndex] = useState(0);

  // loads google fonts when component mounts
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
        padding: "40px",
        color: "#444"
      }}
    >
      {/* page header section */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "2.4rem",
            color: "#7c6aff",
            marginBottom: "8px",
            textTransform: "lowercase"
          }}
        >
          animal encyclopedia
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#888" }}>
          ✿ discover the world's diverse creatures ✿
        </p>
      </header>

      {/* main content container */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 6px 16px rgba(200,200,255,0.3)"
        }}
      >
        {/* two-column layout for filters and upload panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 250px",
            gap: "20px",
            alignItems: "start",
            marginBottom: "30px"
          }}
        >
          {/* filter panel with all filter states */}
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

          {/* upload panel for user image submissions */}
          <UploadPanel />
        </div>

        {/* animal grid displaying filtered results */}
        <AnimalGrid
          habitat={habitat}
          category={category}
          selectedFoods={selectedFoods}
          selectedPatterns={selectedPatterns}
          selectedTextures={selectedTextures}
          selectedColors={selectedColors}
          puppyIndex={puppyIndex}
          setPuppyIndex={setPuppyIndex}
        />
      </div>
    </div>
  );
}