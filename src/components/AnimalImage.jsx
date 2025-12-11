import { useEffect, useState } from "react";

// wikipedia title overrides for images that default to the wrong page
const IMAGE_OVERRIDE = {
  turkey: "Turkey_(bird)" // avoid the country / flag image
  // add more overrides here if wikipedia ever picks the wrong page
};

export default function AnimalImage({
  animal,
  height = 250,
  withBorderBottom = true,
  style = {}
}) {
  const [src, setSrc] = useState(animal.image || "");
  const [loadedFromWiki, setLoadedFromWiki] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // if we already have a non-empty local image, just use it
    if (animal.image && animal.image.trim() !== "") {
      setSrc(animal.image);
      setLoadedFromWiki(false);
      return;
    }

    // if this animal uses the multi-image array (pomeranian),
    // card will handle that separately; no wiki fetch here
    if (Array.isArray(animal.images) && animal.images.length > 0) {
      return;
    }

    // pick a better wikipedia title if we know this name is ambiguous
    const key = animal.name.toLowerCase();
    const overrideTitle = IMAGE_OVERRIDE[key];
    const titleToUse = overrideTitle || animal.name;
    const encodedTitle = encodeURIComponent(titleToUse);

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;

        const img =
          data.originalimage?.source ||
          data.thumbnail?.source ||
          "";

        if (img) {
          setSrc(img);
          setLoadedFromWiki(true);
        }
      })
      .catch(() => {
        // if wiki fails, we just leave src as-is (empty),
        // card can decide to show nothing or a placeholder
      });

    return () => {
      cancelled = true;
    };
  }, [animal.name, animal.image, animal.images]);

  if (!src) {
    // no image at all; you could return a cute placeholder here instead
    return null;
  }

  const objectPosition =
    animal.objectPosition ||
    (animal.name === "tiger"
      ? "center 40%"
      : animal.name === "penguin"
      ? "center 30%"
      : "center");

  return (
    <img
      src={src}
      alt={animal.name}
      style={{
        width: "100%",
        height: `${height}px`,
        objectFit: "cover",
        objectPosition,
        borderBottom: withBorderBottom ? "1px solid #f0e9ff" : "none",
        display: "block",
        ...style
      }}
      data-wiki={loadedFromWiki ? "true" : "false"}
    />
  );
}
