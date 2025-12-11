import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import AnimalModal from "./AnimalModal";
import CompareDrawer from "./CompareDrawer";
import PaginationControls from "./PaginationControls";

export default function AnimalGrid({
  habitat,
  category,
  selectedFoods,
  selectedPatterns,
  selectedTextures,
  selectedColors,
  puppyIndex,
  setPuppyIndex,
  favourites,
  toggleFavourite,
  modalAnimalName,
  setModalAnimalName,
  query
}) {
  // which animals are in the comparison drawer (by name)
  const [compareNames, setCompareNames] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

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
      colors: ["red", "brown", "white", "black"],
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
    },

    // jungle / savannah
    {
      name: "lion",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "yellow"],
      image: ""
    },
    {
      name: "elephant",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "smooth",
      colors: ["grey"],
      image: ""
    },
    {
      name: "giraffe",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "spots",
      texture: "fur",
      colors: ["yellow", "brown"],
      image: "https://cdn.sanity.io/images/cphrnle8/production/a9a440a90458d24d5c34e722094520110f5883df-1440x811.webp?w=1440&q=100"
    },
    {
      name: "zebra",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "stripes",
      texture: "fur",
      colors: ["black", "white"],
      image: ""
    },
    {
      name: "cheetah",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "spots",
      texture: "fur",
      colors: ["yellow", "brown", "black"],
      image: ""
    },
    {
      name: "leopard",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "spots",
      texture: "fur",
      colors: ["yellow", "brown", "black"],
      image: ""
    },
    {
      name: "hippopotamus",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "smooth",
      colors: ["grey", "brown"],
      image: "https://www.sciencing.com/sciencing/adaptations-hippopotamus-8700612/5812f88acadd46a3a0fba1ab3dc7ab9e.jpg"
    },
    {
      name: "rhinoceros",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "smooth",
      colors: ["grey"],
      image: "https://rangerrick.org/wp-content/uploads/2020/10/Rhino-Nov-2020-RR-1156x650-1.jpg"
    },
    {
      name: "hyena",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["meat"],
      size: "medium",
      pattern: "spots",
      texture: "fur",
      colors: ["brown", "black"],
      image: "https://i.natgeofe.com/n/dd8843a2-8ec3-4357-9a76-6d20d876209a/01-hyenas-nationalgeographic_1742911.jpg"
    },
    {
      name: "meerkat",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["insects"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["brown"],
      image: ""
    },
    {
      name: "camel",
      category: ["mammal"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "yellow"],
      image: ""
    },
    {
      name: "crocodile",
      category: ["reptile"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "scales",
      colors: ["green"],
      image: ""
    },
    {
      name: "alligator",
      category: ["reptile"],
      habitat: "jungle",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "scales",
      colors: ["green", "grey"],
      image: "https://www.galvestontx.gov/ImageRepository/Document?documentID=12168"
    },

    // forest mammals
    {
      name: "chimpanzee",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants", "insects"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "black"],
      image: ""
    },
    {
      name: "gorilla",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["black"],
      image: ""
    },
    {
      name: "brown bear",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat", "plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown"],
      image: ""
    },
    {
      name: "panda",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "large",
      pattern: "spots",
      texture: "fur",
      colors: ["black", "white"],
      image: ""
    },
    {
      name: "fox",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["orange", "white", "brown"],
      image: ""
    },
    {
      name: "raccoon",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat", "plants"],
      size: "small",
      pattern: "spots",
      texture: "fur",
      colors: ["grey", "black", "white"],
      image: "https://shumakeranimalremoval.com/wp-content/uploads/2018/12/raccoon.jpg"
    },
    {
      name: "deer",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "white"],
      image: "https://ridgefieldfriends.org/wp-content/uploads/2017/04/Columbia-White-Tail-Buck.jpg?x15533"
    },
    {
      name: "rabbit",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "brown", "grey"],
      image: ""
    },
    {
      name: "squirrel",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "tiny",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "grey", "orange", "red", "black"],
      image: "https://cdn.britannica.com/80/157580-004-FFB75F13.jpg"
    },
    {
      name: "hedgehog",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects"],
      size: "tiny",
      pattern: "spots",
      texture: "smooth",
      colors: ["brown", "white"],
      image: ""
    },
    {
      name: "bat",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects"],
      size: "tiny",
      pattern: "solid",
      texture: "fur",
      colors: ["black", "brown"],
      image: "https://conservingcarolina.org/wp-content/uploads/2022/10/shutterstock_1282913071_mfig5z.webp"
    },
    {
      name: "lynx",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat"],
      size: "medium",
      pattern: "spots",
      texture: "fur",
      colors: ["brown", "grey", "white"],
      image: "https://images.takeshape.io/86ce9525-f5f2-4e97-81ba-54e8ce933da7/dev/55481649-74d8-4f29-9d5a-fca10d3c59ca/CanadianLynx-WikiCommons2.webp"
    },
    {
      name: "moose",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown"],
      image: ""
    },
    {
      name: "bison",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown"],
      image: ""
    },
    {
      name: "cougar",
      category: ["mammal"],
      habitat: "forest",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "yellow"],
      image: ""
    },
    {
      name: "wombat",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "grey"],
      image: ""
    },
    {
      name: "platypus",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects"],
      size: "small",
      pattern: "solid",
      texture: "smooth",
      colors: ["brown"],
      image: ""
    },
    {
      name: "armadillo",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects"],
      size: "small",
      pattern: "solid",
      texture: "scales",
      colors: ["brown", "grey"],
      image: "https://cosleyzoo.org/wp-content/uploads/Nine-banded-Armadillo.jpg"
    },
    {
      name: "skunk",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects", "meat"],
      size: "small",
      pattern: "stripes",
      texture: "fur",
      colors: ["black", "white", "grey"],
      image: ""
    },
    {
      name: "beaver",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["brown"],
      image: ""
    },
    {
      name: "chipmunk",
      category: ["mammal"],
      habitat: "forest",
      diet: ["plants"],
      size: "tiny",
      pattern: "stripes",
      texture: "fur",
      colors: ["brown", "white"],
      image: ""
    },
    {
      name: "badger",
      category: ["mammal"],
      habitat: "forest",
      diet: ["insects", "meat"],
      size: ["medium"],
      pattern: ["stripes"],
      texture: "fur",
      colors: ["black", "white", "grey", "brown"],
      image: "https://upload.wikimedia.org/wikipedia/commons/4/41/M%C3%A4yr%C3%A4_%C3%84ht%C3%A4ri_4.jpg"
    },
    {
      name: "salamander",
      category: ["amphibian"],
      habitat: "forest",
      diet: ["insects"],
      size: "small",
      pattern: "spots",
      texture: "smooth",
      colors: ["black", "orange", "yellow"],
      image: "https://www.deepseaworld.com/wp-content/uploads/2024/02/iStock-474026652-1024x683.jpg"
    },

    // polar extras
    {
      name: "reindeer",
      category: ["mammal"],
      habitat: "polar",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "white"],
      image: "https://images.takeshape.io/86ce9525-f5f2-4e97-81ba-54e8ce933da7/dev/21f407e3-2624-4c06-992b-af35afdfc823/Reindeer%20dreamstime.jpeg?auto=compress%2Cformat&w=1440"
    },
    {
      name: "snowshoe hare",
      category: ["mammal"],
      habitat: "polar",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "grey"],
      image: "https://cdn.britannica.com/05/7705-050-DE423F1A/hare-Snowshoe-lepus-americanus-winter-coat.jpg"
    },
    // ocean / water
    {
      name: "dolphin",
      category: ["mammal"],
      habitat: "ocean",
      diet: ["fish"],
      size: "large",
      pattern: "solid",
      texture: "smooth",
      colors: ["grey", "blue"],
      image: "https://b2358083.smushcdn.com/2358083/wp-content/uploads/2021/05/BottlenoseDolphin.jpg?lossy=2&strip=1&webp=1"
    },
    {
      name: "shark",
      category: ["fish"],
      habitat: "ocean",
      diet: ["meat"],
      size: "large",
      pattern: "solid",
      texture: "scales",
      colors: ["grey", "white"],
      image: "https://d1jyxxz9imt9yb.cloudfront.net/article/11881/meta_image/regular/Tiger-7--2013_reduced.jpg"
    },
    {
      name: "whale",
      category: ["mammal"],
      habitat: "ocean",
      diet: ["fish"],
      size: "large",
      pattern: "solid",
      texture: "smooth",
      colors: ["blue", "grey"],
      image: ""
    },
    {
      name: "sea turtle",
      category: ["reptile"],
      habitat: "ocean",
      diet: ["plants"],
      size: "medium",
      pattern: "spots",
      texture: "scales",
      colors: ["green", "brown"],
      image: ""
    },
    {
      name: "octopus",
      category: ["invertebrate"],
      habitat: "ocean",
      diet: ["meat"],
      size: "medium",
      pattern: "spots",
      texture: "smooth",
      colors: ["purple", "red"],
      image: ""
    },
    {
      name: "crab",
      category: ["invertebrate"],
      habitat: "ocean",
      diet: ["meat"],
      size: "small",
      pattern: "solid",
      texture: "smooth",
      colors: ["red", "orange"],
      image: "https://cdn.mos.cms.futurecdn.net/SRdGNTqjvjVoQ2XYrgEjLN-1920-80.jpg"
    },
    {
      name: "otter",
      category: ["mammal"],
      habitat: "forest",
      diet: ["fish"],
      size: "small",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "white", "black"],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg"
    },
    {
      name: "jellyfish",
      category: ["invertebrate"],
      habitat: "ocean",
      diet: ["meat"],
      size: "small",
      pattern: "solid",
      texture: "smooth",
      colors: ["purple", "blue"],
      image: ""
    },
    {
      name: "sea star",
      category: ["invertebrate"],
      habitat: "ocean",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "smooth",
      colors: ["orange", "red"],
      image: "https://imagine5.com/wp-content/uploads/2021/02/5_seafood-business_01_hero_W2Y5J1_2000.jpg.webp"
    },
    {
      name: "manta ray",
      category: ["fish"],
      habitat: "ocean",
      diet: ["plants"],
      size: "large",
      pattern: "spots",
      texture: "smooth",
      colors: ["blue", "grey"],
      image: ""
    },
    {
      name: "clownfish",
      category: ["fish"],
      habitat: "ocean",
      diet: ["plants"],
      size: "small",
      pattern: "stripes",
      texture: "scales",
      colors: ["orange", "white", "black"],
      image: ""
    },
    {
      name: "salmon",
      category: ["fish"],
      habitat: "ocean",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "scales",
      colors: ["grey", "pink", "red", "green"],
      image: "https://thumbs.dreamstime.com/b/close-up-big-salmon-jump-out-splashing-water-nature-background-close-up-big-salmon-jump-out-splashing-water-nature-357864600.jpg"
    },
    {
      name: "stingray",
      category: ["fish"],
      habitat: "ocean",
      diet: ["meat"],
      size: "medium",
      pattern: "spots",
      texture: "smooth",
      colors: ["grey", "brown"],
      image: "https://cdn.mos.cms.futurecdn.net/v2/t:21,l:0,cw:1846,ch:1038,q:80,w:1846/nLDqFXpa6q4UHVgWoEg2de.jpg"
    },
    {
      name: "goldfish",
      category: ["fish"],
      habitat: "ocean",
      diet: ["plants"],
      size: "tiny",
      pattern: "solid",
      texture: "scales",
      colors: ["orange", "white", "yellow"],
      image: "https://image.petmd.com/files/styles/978x550/public/2024-06/goldfish.jpg"
    },

    // birds
    {
      name: "eagle",
      category: ["bird"],
      habitat: "forest",
      diet: ["meat"],
      size: "medium",
      pattern: "solid",
      texture: "feathers",
      colors: ["brown", "white"],
      image: "https://nationalzoo.si.edu/sites/default/files/animals/baldeagle-002.jpg"
    },
    {
      name: "flamingo",
      category: ["bird"],
      habitat: "ocean",
      diet: ["fish"],
      size: "medium",
      pattern: "solid",
      texture: "feathers",
      colors: ["pink", "white"],
      image: ""
    },
    {
      name: "parrot",
      category: ["bird"],
      habitat: "jungle",
      diet: ["plants"],
      size: "small",
      pattern: "spots",
      texture: "feathers",
      colors: ["green", "red", "blue", "yellow", "orange", "white", "black"],
      image: "https://as2.ftcdn.net/v2/jpg/00/43/06/21/1000_F_43062103_9O3g0hNHpKfugKIqhBV6HS7feW71lfDl.jpg"
    },
    {
      name: "swan",
      category: ["bird"],
      habitat: "forest",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "feathers",
      colors: ["white"],
      image: ""
    },
    {
      name: "duck",
      category: ["bird"],
      habitat: "forest",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "feathers",
      colors: ["brown", "yellow", "green"],
      image: ""
    },
    {
      name: "peacock",
      category: ["bird"],
      habitat: "jungle",
      diet: ["plants"],
      size: "medium",
      pattern: "spots",
      texture: "feathers",
      colors: ["blue", "green"],
      image: ""
    },
    {
      name: "ostrich",
      category: ["bird"],
      habitat: "jungle",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "feathers",
      colors: ["brown", "white"],
      image: "https://cdn.theatlantic.com/thumbor/LV_DH34UpAL5CTy5yswaWeVMKdQ=/336x0:2361x1519/1200x900/media/img/mt/2025/01/2025_01_07_ostrich_1555343491/original.jpg"
    },
    {
      name: "goose",
      category: ["bird"],
      habitat: "forest",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "feathers",
      colors: ["white", "grey"],
      image: ""
    },
    {
      name: "turkey",
      category: ["bird"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "spots",
      texture: "feathers",
      colors: ["brown", "red"],
      image: ""
    },
    {
      name: "pigeon",
      category: ["bird"],
      habitat: "home",
      diet: ["plants"],
      size: "small",
      pattern: "solid",
      texture: "feathers",
      colors: ["grey", "white"],
      image: ""
    },
    {
      name: "crow",
      category: ["bird"],
      habitat: "forest",
      diet: ["meat", "plants"],
      size: "small",
      pattern: "solid",
      texture: "feathers",
      colors: ["black"],
      image: "https://media.audubon.org/dsc_2017.jpg?width=1616&auto=webp&quality=90&fit=bounds&disable=upscale"
    },
    {
      name: "kingfisher",
      category: ["bird"],
      habitat: "forest",
      diet: ["fish"],
      size: "small",
      pattern: "spots",
      texture: "feathers",
      colors: ["blue", "orange"],
      image: ""
    },

    // pets / home animals
    {
      name: "tabby cat",
      category: ["pet", "mammal"],
      habitat: "home",
      diet: ["meat"],
      size: "small",
      pattern: "stripes",
      texture: "fur",
      colors: ["brown", "orange", "black"],
      image: ""
    },
    {
      name: "golden retriever",
      category: ["pet", "mammal"],
      habitat: "home",
      diet: ["meat"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["yellow"],
      image: "https://gladdogsnation.com/cdn/shop/articles/why-golden-retriever-is-the-best-breed-choice-for-a-young-family-1849396_1200x.jpg?v=1762876896"
    },
    {
      name: "hamster",
      category: ["pet", "mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "tiny",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "white"],
      image: ""
    },
    {
      name: "guinea pig",
      category: ["pet", "mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "small",
      pattern: "spots",
      texture: "fur",
      colors: ["brown", "white", "black"],
      image: ""
    },

    // farm animals
    {
      name: "cow",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "large",
      pattern: "spots",
      texture: "fur",
      colors: ["black", "white", "brown"],
      image: ""
    },
    {
      name: "pig",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "smooth",
      colors: ["pink"],
      image: ""
    },
    {
      name: "sheep",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "black", "brown"],
      image: "https://media.4-paws.org/4/d/5/7/4d579ac34a8ee834f2c9acc26c4eaba336d7f034/shutterstock_97268789%20-%20lamb%20looking%20at%20camera%20-%20web%20size-1277x884.jpg"
    },
    {
      name: "goat",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "brown", "black"],
      image: ""
    },
    {
      name: "horse",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "large",
      pattern: "solid",
      texture: "fur",
      colors: ["brown", "black", "white"],
      image: "https://yumove.co.uk/cdn/shop/articles/custom_resized_1cc2e5e7-0533-4a07-8405-ea0fb000cb86.jpg?v=1763561868"
    },
    {
      name: "chicken",
      category: ["bird"],
      habitat: "home",
      diet: ["plants", "insects"],
      size: "small",
      pattern: "spots",
      texture: "feathers",
      colors: ["brown", "white"],
      image: "https://www.freedomrangerhatchery.com/wp-content/uploads/2019/03/flock-1024x680.jpg"
    },
    {
      name: "llama",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "brown", "black"],
      image: "https://nwyarns.com/cdn/shop/articles/Llama_1024x1024.png?v=1512170916"
    },
    {
      name: "alpaca",
      category: ["mammal"],
      habitat: "home",
      diet: ["plants"],
      size: "medium",
      pattern: "solid",
      texture: "fur",
      colors: ["white", "brown", "black"],
      image: "https://media.istockphoto.com/id/1145862464/photo/white-alpaca-with-offspring-south-american-mammal.jpg?s=612x612&w=0&k=20&c=DOtPL4R9LL8se_cidqun48bLIRLoyX_2IbVEHv7DjKQ="
    }
  ];

  // filters animals based on selected criteria
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

    const matchPattern =
      selectedPatterns.length === 0 ||
      selectedPatterns.includes(a.pattern);

    const matchTexture =
      selectedTextures.length === 0 ||
      selectedTextures.includes(a.texture);

    const matchColors =
      selectedColors.length === 0 ||
      a.colors.some(c => selectedColors.includes(c));

    const trimmedQuery = (query || "").trim().toLowerCase();
    const matchName =
      !trimmedQuery || a.name.toLowerCase().includes(trimmedQuery);

    return (
      matchHab &&
      matchCat &&
      matchDiet &&
      matchPattern &&
      matchTexture &&
      matchColors &&
      matchName
    );
  });

  // whenever filters or search query change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [
    habitat,
    category,
    selectedFoods,
    selectedPatterns,
    selectedTextures,
    selectedColors,
    query
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageAnimals = filtered.slice(start, start + PAGE_SIZE);

  // compute full objects for the comparison drawer
  const selectedCompareAnimals = animals.filter(a =>
    compareNames.includes(a.name)
  );

  function toggleCompare(name) {
    setCompareNames(prev => {
      if (prev.includes(name)) {
        // remove if already selected
        return prev.filter(n => n !== name);
      }
      if (prev.length >= 2) {
        // only allow up to 2 animals at once
        return prev;
      }
      return [...prev, name];
    });
  }

  // choose modal animal based on name passed from Home
  const modalAnimal = modalAnimalName
    ? animals.find(a => a.name === modalAnimalName) || null
    : null;

  return (
    <>
      {/* responsive grid layout for animal cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "26px",
          paddingTop: "6px"
        }}
      >
        {pageAnimals.map(a => (
          <AnimalCard
            key={a.name}
            a={a}
            puppyIndex={puppyIndex}
            setPuppyIndex={setPuppyIndex}
            isFavourite={favourites.includes(a.name)}
            toggleFavourite={toggleFavourite}
            isCompared={compareNames.includes(a.name)}
            onToggleCompare={() => toggleCompare(a.name)}
          />
        ))}
      </div>

      {/* pagination below grid */}
      <PaginationControls
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* modal lives here because this file knows the animals list */}
      <AnimalModal animal={modalAnimal} onClose={() => setModalAnimalName(null)} />

      {/* slide-up comparison drawer */}
      <CompareDrawer
        selectedAnimals={selectedCompareAnimals}
        onClear={() => setCompareNames([])}
      />
    </>
  );
}
