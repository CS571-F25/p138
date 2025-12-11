import { useEffect, useState } from "react";

const WIKI_OVERRIDE = {
  pomeranian: "Pomeranian_dog",
  "red panda": "Red_panda",
  turkey: "Turkey_(bird)",     // avoid the country
  budgie: "Budgerigar",        // actual bird name
  "snow hare": "Arctic_hare"   // if you add this animal
  // add more overrides here if wikipedia ever picks the wrong page
};

const ANIMAL_HINT_WORDS = [
  "species of",
  "breed of",
  "mammal",
  "bird",
  "fish",
  "reptile",
  "amphibian",
  "insect",
  "animal",
  "marsupial",
  "rodent",
  "canine",
  "feline",
  "primate",
  "pinniped",
  "parrot",
  "passerine"
];

export default function AnimalWikiInfo({ name }) {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!name) return;

    let cancelled = false;

    async function fetchWiki() {
      try {
        setStatus("loading");
        setSummary("");
        setUrl("");

        const key = name.toLowerCase();
        const overrideTitle = WIKI_OVERRIDE[key];

        let pageTitle;

        if (overrideTitle) {
          // explicit title that we know is an animal
          pageTitle = overrideTitle;
        } else {
          // search for "<name> animal" and take the first hit
          const searchTerm = `${name} animal`;
          const searchUrl =
            "https://en.wikipedia.org/w/api.php?" +
            "action=query&list=search&format=json&origin=*&srsearch=" +
            encodeURIComponent(searchTerm);

          const searchRes = await fetch(searchUrl);
          if (!searchRes.ok) throw new Error("search failed");
          const searchData = await searchRes.json();
          const first = searchData?.query?.search?.[0];
          if (!first) throw new Error("no search results");

          pageTitle = first.title;
        }

        const encoded = encodeURIComponent(pageTitle);
        const summaryRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`
        );
        if (!summaryRes.ok) throw new Error("bad response");
        const data = await summaryRes.json();

        const desc =
          (data.description || "").toLowerCase() +
          " " +
          (data.extract || "").toLowerCase();

        const looksLikeAnimal = ANIMAL_HINT_WORDS.some(word =>
          desc.includes(word)
        );

        if (!looksLikeAnimal) {
          if (!cancelled) setStatus("error");
          return;
        }

        if (!cancelled) {
          setSummary(data.extract || "");
          const pageUrl =
            data.content_urls?.desktop?.page ||
            data.content_urls?.mobile?.page ||
            "";
          setUrl(pageUrl);
          setStatus("done");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchWiki();

    return () => {
      cancelled = true;
    };
  }, [name]);

  if (!name || status === "idle" || status === "error") {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "18px",
        paddingTop: "14px",
        borderTop: "1px solid #eee"
      }}
    >
      <p
        style={{
          margin: "0 0 6px 0",
          fontSize: "0.9rem",
          color: "#7c6aff",
          textTransform: "lowercase",
          fontWeight: 600
        }}
      >
        more from wikipedia
      </p>

      {status === "loading" && (
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: "#999"
          }}
        >
          loading summary…
        </p>
      )}

      {status === "done" && summary && (
        <>
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "0.85rem",
              color: "#555",
              lineHeight: 1.4
            }}
          >
            {summary}
          </p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.85rem",
                color: "#7c6aff",
                textDecoration: "underline",
                textDecorationThickness: "1px"
              }}
            >
              read full article ↗
            </a>
          )}
        </>
      )}
    </div>
  );
}
