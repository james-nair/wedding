import { useState, useEffect } from "react";

export const sizes = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

type Media = keyof typeof sizes;

// function isMatch(media: Media) {
//     const query = `(min-width: ${sizes[media]})`;
//     return window.matchMedia(query).matches;
// }

// function findClosest(queries) {
//     for (let i = queries.length - 1; i >= 0; i--) {
//         if (isMatch(queries[i])) {
//             return queries[i];
//         }
//     }
//     return 'sm';
// }

export const useMediaQuery = (screen: Media) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(max-width: ${sizes[screen]})`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, screen]);

  return matches;
};
