import React, { useState, useEffect } from "react";

export default function App() {
  const [habitat, setHabitat] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [puppyIndex, setPuppyIndex] = useState(0); // for mochiball/riceball carousel

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleNext = () => setPuppyIndex(prev => (prev + 1) % 2);
  const handlePrev = () => setPuppyIndex(prev => (prev - 1 + 2) % 2);

  const animals = [
    {
      name: "pomeranian",
      category: ["pet", "mammal"], // multiple categories
      habitat: "home",
      diet: ["meat", "plants"],
      size: "tiny",
      images: ["/p138/mochiball.jpg", "/p138/riceball.jpg"],
      objectPosition: "center 10%" // show more top (move image up)
    },
    {
      name: "tiger",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      image:
        "https://scontent-msp1-1.cdninstagram.com/v/t51.75761-15/481019828_18058251779050078_4432466861029995210_n.webp?_nc_cat=103&ig_cache_key=MzU3MzA2MDIxMzU2NjM0NzYyOA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=2nMfpqU64LQQ7kNvwFkYU5X&_nc_oc=AdlV9X_TSoCG5ypxFH7aY-KaMX6PEsZ3PUEhzBE-TK632LQ9rHd847zddRxNyOa9Y90&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_gid=hlx4DKQ_4Cm99-CxPmqKxg&oh=00_Afg6QNSmBo1aYvUPWR45bk3tnX-EIIbwMuUFSdpvu8vtAA&oe=69115C0A"
    },
    {
      name: "penguin",
      category: ["bird"],
      habitat: "polar",
      diet: ["fish"],
      size: "medium",
      image:
        "https://scontent-msp1-1.cdninstagram.com/v/t39.30808-6/487795789_976461158032327_894621836886694905_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzQ3NDY2MjEzNzQ1MDcxMzY5OA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=0xka1cecxAAQ7kNvwEgDVk1&_nc_oc=AdkTd9Zj-wPfyEOlmv1ahZM7nxl6URpu0dmbeTcIPahYUpSsKTRpVkPCX3pAiYm_Lo4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_gid=e0AHp4ewuH6DwYlnlSxdfg&oh=00_Afg7_C20H3et3evB6vvS8HNy8HQEdZ-z2M6KwCYe0nmS8Q&oe=69116F52"
    },
    {
      name: "wolf",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat"],
      size: "large",
      image:
        "https://www.spirithoods.com/cdn/shop/articles/MAIN_BLOG_IMG_Grey-WOlf-1800x1200_1600x.jpg?v=1745954852"
    },
    {
      name: "frog",
      category: ["amphibian"],
      habitat: "jungle",
      diet: ["insects"],
      size: "small",
      image:
        "https://www.aquariumofpacific.org/images/made_new/images-exhibits-Magnificent_Tree_Frog_900_600_q85.jpg"
    },
    {
      name: "snake",
      category: ["reptile"],
      habitat: "jungle",
      diet: ["meat"],
      size: "medium",
      image:
        "https://www.shutterstock.com/image-photo/hairy-bush-viper-atheris-hispida-600nw-2050788005.jpg"
    },
    {
      name: "dragonfly",
      category: ["insect"],
      habitat: "forest",
      diet: ["insects"],
      size: "tiny",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Gemeine_Heidelibelle_%28Sympetrum_vulgatum%29_4.jpg"
    }
  ];

  const handleFoodChange = food => {
    setSelectedFoods(prev =>
      prev.includes(food)
        ? prev.filter(f => f !== food)
        : [...prev, food]
    );
  };

  const filtered = animals.filter(a => {
    const matchHab = !habitat || a.habitat === habitat;
    const matchCat =
      !category ||
      (Array.isArray(a.category)
        ? a.category.includes(category)
        : a.category === category);
    const matchDiet =
      selectedFoods.length === 0 ||
      a.diet.some(d => selectedFoods.includes(d));
    return matchHab && matchCat && matchDiet;
  });

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
          ✿ discover the world’s diverse creatures ✿
        </p>
      </header>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 6px 16px rgba(200,200,255,0.3)"
        }}
      >
        {/* filters */}
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
            <option value="bird">bird</option>
            <option value="reptile">reptile</option>
            <option value="amphibian">amphibian</option>
            <option value="insect">insect</option>
            <option value="pet">pet</option>
          </select>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <p style={{ marginBottom: "8px", color: "#7c6aff" }}>
            what does your animal eat?
          </p>
          {["insects", "meat", "fish", "plants"].map(food => (
            <label key={food} style={{ marginRight: "14px" }}>
              <input
                type="checkbox"
                checked={selectedFoods.includes(food)}
                onChange={() => handleFoodChange(food)}
              />{" "}
              {food}
            </label>
          ))}
        </div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {filtered.map(a => (
            <div
              key={a.name}
              style={{
                border: "2px solid #f0e9ff",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#fffaff",
                boxShadow: "0 2px 8px rgba(180,160,255,0.15)",
                transition: "transform 0.2s ease",
                position: "relative"
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {a.images ? (
                <div style={{ position: "relative" }}>
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
                  <button
                    onClick={handlePrev}
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
                  <button
                    onClick={handleNext}
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
                <img
                  src={a.image}
                  alt={a.name}
                  style={{
                    width: "100%",
                    height: "260px",
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
              <div style={{ padding: "12px 16px" }}>
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
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  category:{" "}
                  {Array.isArray(a.category)
                    ? a.category.join(", ")
                    : a.category}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  habitat: {a.habitat}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  eats: {a.diet.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* upload */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "#7c6aff" }}>upload an animal photo (coming soon!)</p>
          <input
            type="file"
            accept="image/*"
            style={{
              backgroundColor: "#f5f0ff",
              borderRadius: "10px",
              border: "1px solid #d8ccff",
              padding: "6px 8px"
            }}
          />
        </div>
      </div>
    </div>
  );
}
