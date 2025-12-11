import { useState } from "react";

export default function FilterPanel({
  habitat,
  setHabitat,
  category,
  setCategory,
  selectedFoods,
  setSelectedFoods,
  selectedPatterns,
  setSelectedPatterns,
  selectedTextures,
  setSelectedTextures,
  selectedColors,
  setSelectedColors
}) {
  const toggle = (value, arr, setArr) => {
    setArr(prev =>
      prev.includes(value)
        ? prev.filter(x => x !== value)
        : [...prev, value]
    );
  };

  // all closed by default now
  const [openDiet, setOpenDiet] = useState(false);
  const [openPatterns, setOpenPatterns] = useState(false);
  const [openTextures, setOpenTextures] = useState(false);
  const [openColours, setOpenColours] = useState(false);

  function SectionHeader({ label, open, onToggle, subtitle }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          border: "1px solid #e1d7ff",
          borderRadius: "10px",
          padding: "6px 10px",
          background: "#f8f4ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: open ? "6px" : "10px"
        }}
      >
        <span
          style={{
            color: "#7c6aff",
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "lowercase"
          }}
        >
          {label}
          {subtitle && (
            <span
              style={{
                marginLeft: "6px",
                fontWeight: 400,
                fontSize: "0.8rem",
                color: "#9a8fd4"
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
        <span style={{ fontSize: "0.9rem", color: "#7c6aff" }}>
          {open ? "▴" : "▾"}
        </span>
      </button>
    );
  }

  return (
    <div>
      {/* habitat dropdown */}
      <div style={{ marginBottom: "18px" }}>
        <label
          style={{
            color: "#7c6aff",
            fontWeight: 600,
            marginRight: "8px",
            textTransform: "lowercase"
          }}
        >
          filter by habitat:
        </label>
        <select
          value={habitat}
          onChange={e => setHabitat(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid #d3caff",
            backgroundColor: "#faf7ff"
          }}
        >
          <option value="">all</option>
          <option value="home">home</option>
          <option value="jungle">jungle</option>
          <option value="polar">polar</option>
          <option value="forest">forest</option>
          <option value="ocean">ocean</option>
        </select>
      </div>

      {/* category dropdown */}
      <div style={{ marginBottom: "22px" }}>
        <label
          style={{
            color: "#7c6aff",
            fontWeight: 600,
            marginRight: "8px",
            textTransform: "lowercase"
          }}
        >
          filter by category:
        </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid #d3caff",
            backgroundColor: "#faf7ff"
          }}
        >
          <option value="">all</option>
          <option value="mammal">mammal</option>
          <option value="pet">pet</option>
          <option value="bird">bird</option>
          <option value="reptile">reptile</option>
          <option value="amphibian">amphibian</option>
          <option value="insect">insect</option>
          <option value="fish">fish</option>
        </select>
      </div>

      {/* diet */}
      <div style={{ marginBottom: "14px" }}>
        <SectionHeader
          label="diet"
          open={openDiet}
          onToggle={() => setOpenDiet(o => !o)}
          subtitle={
            selectedFoods.length > 0
              ? `(${selectedFoods.length} selected)`
              : ""
          }
        />
        {openDiet && (
          <div
            style={{
              paddingLeft: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "0.9rem"
            }}
          >
            {["insects", "meat", "fish", "plants"].map(food => (
              <label key={food}>
                <input
                  type="checkbox"
                  checked={selectedFoods.includes(food)}
                  onChange={() =>
                    toggle(food, selectedFoods, setSelectedFoods)
                  }
                  style={{ marginRight: "6px" }}
                />
                {food}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* patterns */}
      <div style={{ marginBottom: "14px" }}>
        <SectionHeader
          label="patterns"
          open={openPatterns}
          onToggle={() => setOpenPatterns(o => !o)}
          subtitle={
            selectedPatterns.length > 0
              ? `(${selectedPatterns.length} selected)`
              : ""
          }
        />
        {openPatterns && (
          <div
            style={{
              paddingLeft: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "0.9rem"
            }}
          >
            {["stripes", "spots", "solid"].map(p => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={selectedPatterns.includes(p)}
                  onChange={() =>
                    toggle(p, selectedPatterns, setSelectedPatterns)
                  }
                  style={{ marginRight: "6px" }}
                />
                {p}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* textures */}
      <div style={{ marginBottom: "14px" }}>
        <SectionHeader
          label="textures"
          open={openTextures}
          onToggle={() => setOpenTextures(o => !o)}
          subtitle={
            selectedTextures.length > 0
              ? `(${selectedTextures.length} selected)`
              : ""
          }
        />
        {openTextures && (
          <div
            style={{
              paddingLeft: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "0.9rem"
            }}
          >
            {["fur", "scales", "feathers", "smooth"].map(t => (
              <label key={t}>
                <input
                  type="checkbox"
                  checked={selectedTextures.includes(t)}
                  onChange={() =>
                    toggle(t, selectedTextures, setSelectedTextures)
                  }
                  style={{ marginRight: "6px" }}
                />
                {t}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* colours */}
      <div>
        <SectionHeader
          label="colours"
          open={openColours}
          onToggle={() => setOpenColours(o => !o)}
          subtitle={
            selectedColors.length > 0
              ? `(${selectedColors.length} selected)`
              : ""
          }
        />
        {openColours && (
          <div
            style={{
              paddingLeft: "4px",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px 10px",
              fontSize: "0.9rem",
              marginTop: "2px"
            }}
          >
            {[
              "white",
              "black",
              "brown",
              "grey",
              "orange",
              "yellow",
              "green",
              "blue"
            ].map(c => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c)}
                  onChange={() =>
                    toggle(c, selectedColors, setSelectedColors)
                  }
                  style={{ marginRight: "6px" }}
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
