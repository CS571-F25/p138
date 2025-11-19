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
  // generic toggle function for checkbox arrays
  const toggle = (value, arr, setArr) => {
    setArr(prev =>
      prev.includes(value)
        ? prev.filter(x => x !== value)  // removes if already selected
        : [...prev, value]               // adds if not selected
    );
  };

  return (
    <div>
      {/* habitat filter dropdown */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ color: "#7c6aff" }}>filter by habitat: </label>
        <select
          value={habitat}
          onChange={e => setHabitat(e.target.value)}
          style={{
            marginLeft: "8px",
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
        </select>
      </div>

      {/* category filter dropdown */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ color: "#7c6aff" }}>filter by category: </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            marginLeft: "8px",
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
        </select>
      </div>

      {/* diet filter checkboxes */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ marginBottom: "8px", color: "#7c6aff" }}>
          what does your animal eat?
        </p>
        {["insects", "meat", "fish", "plants"].map(food => (
          <label key={food} style={{ marginRight: "14px" }}>
            <input
              type="checkbox"
              checked={selectedFoods.includes(food)}
              onChange={() => toggle(food, selectedFoods, setSelectedFoods)}
            />{" "}
            {food}
          </label>
        ))}
      </div>

      {/* pattern filter checkboxes */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ marginBottom: "8px", color: "#7c6aff" }}>patterns:</p>
        {["stripes", "spots", "solid"].map(p => (
          <label key={p} style={{ marginRight: "14px" }}>
            <input
              type="checkbox"
              checked={selectedPatterns.includes(p)}
              onChange={() => toggle(p, selectedPatterns, setSelectedPatterns)}
            />{" "}
            {p}
          </label>
        ))}
      </div>

      {/* texture filter checkboxes */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ marginBottom: "8px", color: "#7c6aff" }}>textures:</p>
        {["fur", "scales", "feathers"].map(t => (
          <label key={t} style={{ marginRight: "14px" }}>
            <input
              type="checkbox"
              checked={selectedTextures.includes(t)}
              onChange={() => toggle(t, selectedTextures, setSelectedTextures)}
            />{" "}
            {t}
          </label>
        ))}
      </div>

      {/* color filter checkboxes */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ marginBottom: "8px", color: "#7c6aff" }}>colours:</p>
        {["white", "black", "brown", "grey", "orange", "yellow", "green"].map(
          c => (
            <label key={c} style={{ marginRight: "14px" }}>
              <input
                type="checkbox"
                checked={selectedColors.includes(c)}
                onChange={() => toggle(c, selectedColors, setSelectedColors)}
              />{" "}
              {c}
            </label>
          )
        )}
      </div>
    </div>
  );
}