import AnimalCard from "./AnimalCard";
import { useState } from "react";

export default function AnimalGrid({
  habitat,
  category,
  selectedFoods,
  selectedPatterns,
  selectedTextures,
  selectedColors,
  puppyIndex,
  setPuppyIndex
}) {
  // defines animal data with properties for filtering
  const animals = [
    {
      name: "pomeranian",
      category: ["pet", "mammal"],
      habitat: "home",
      diet: ["meat", "plants"],
      size: "tiny",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "cream", "black", "brown"],
      images: ["/p138/mochiball.jpg", "/p138/riceball.jpg"],
      objectPosition: "center 10%"
    },
    {
      name: "tiger",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "stripes",
      texture: "fur",
      colors: ["orange", "black", "white"],
      image:
        "https://www.wildlifeworldwide.com/images/categories/tiger_safaris_pench.jpg"
    },
    {
      name: "penguin",
      category: ["bird"],
      habitat: "polar",
      diet: ["fish"],
      size: "medium",
      pattern: "solid",
      texture: "feathers",
      colors: ["black", "white", "grey"],
      image:
        "https://www.americanhumane.org/wp-content/uploads/2024/11/Emperor-penguin2-1440x900.png"
    },
    {
      name: "wolf",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["grey", "white"],
      image:
        "https://www.spirithoods.com/cdn/shop/articles/MAIN_BLOG_IMG_Grey-WOlf-1800x1200_1600x.jpg?v=1745954852"
    },
    {
      name: "frog",
      category: ["amphibian"],
      habitat: "jungle",
      diet: ["insects"],
      size: "small",
      pattern: "spots",
      texture: "smooth",
      colors: ["green", "yellow"],
      image:
        "https://www.aquariumofpacific.org/images/made_new/images-exhibits-Magnificent_Tree_Frog_900_600_q85.jpg"
    },
    {
      name: "snake",
      category: ["reptile"],
      habitat: "jungle",
      diet: ["meat"],
      size: "medium",
      pattern: "solid",
      texture: "scales",
      colors: ["green", "yellow"],
      image:
        "https://www.shutterstock.com/image-photo/hairy-bush-viper-atheris-hispida-600nw-2050788005.jpg"
    },
    {
      name: "dragonfly",
      category: ["insect"],
      habitat: "forest",
      diet: ["insects"],
      size: "tiny",
      pattern: "solid",
      texture: "smooth",
      colors: ["yellow", "black"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Gemeine_Heidelibelle_%28Sympetrum_vulgatum%29_4.jpg"
    },

    /* ---------- NEW ANIMALS INSERTED BELOW THIS COMMENT ---------- */

    {
      name: "polar bear",
      category: ["mammal"],
      habitat: "polar",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "cream"],
      image: ""
    },
    {
      name: "seahorse",
      category: ["fish"],
      habitat: "ocean",
      diet: ["insects", "plants"],
      size: "tiny",
      pattern: "solid",
      texture: "scales",
      colors: ["yellow", "orange"],
      image: ""
    },
    {
      name: "red panda",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants", "insects"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["red", "brown", "white"],
      image: ""
    },
    {
      name: "owl",
      category: ["bird"],
      habitat: "forest",
      diet: ["meat"],
      size: "medium",
      pattern: "spots",
      texture: "feathers",
      colors: ["brown", "white", "grey"],
      image: ""
    },
    {
      name: "koala",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["grey", "white"],
      image: ""
    },
    {
      name: "butterfly",
      category: ["insect"],
      habitat: "forest",
      diet: ["plants"],
      size: "tiny",
      pattern: "spots",
      texture: "smooth",
      colors: ["blue", "orange", "black", "yellow"],
      image: ""
    }

    /* ---------- END OF NEW ANIMAL INSERTS ---------- */
  ];

  // filters animals based on selected criteria
  const filtered = animals.filter(a => {
    // checks habitat match (no filter selected or matches habitat)
    const matchHab = !habitat || a.habitat === habitat;

    // checks category match (handles both array and string categories)
    const matchCat =
      !category ||
      (Array.isArray(a.category)
        ? a.category.includes(category)
        : a.category === category);

    // checks diet match (no foods selected or animal eats at least one selected food)
    const matchDiet =
      selectedFoods.length === 0 ||
      a.diet.some(d => selectedFoods.includes(d));

    // checks pattern match (no patterns selected or matches pattern)
    const matchPattern =
      selectedPatterns.length === 0 ||
      selectedPatterns.includes(a.pattern);

    // checks texture match (no textures selected or matches texture)
    const matchTexture =
      selectedTextures.length === 0 ||
      selectedTextures.includes(a.texture);

    // checks color match (no colors selected or animal has at least one selected color)
    const matchColors =
      selectedColors.length === 0 ||
      a.colors.some(c => selectedColors.includes(c));

    // returns true only if all filter conditions are met
    return (
      matchHab &&
      matchCat &&
      matchDiet &&
      matchPattern &&
      matchTexture &&
      matchColors
    );
  });

  return (
    // responsive grid layout for animal cards
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "20px"
      }}
    >
      {/* renders filtered animal cards */}
      {filtered.map(a => (
        <AnimalCard
          key={a.name}
          a={a}
          puppyIndex={puppyIndex}
          setPuppyIndex={setPuppyIndex}
        />
      ))}
    </div>
  );
}
