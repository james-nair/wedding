import { useEffect, useState } from "react";

export const useIsPortrait = () => {
  const [results, setResults] = useState<boolean>();

  useEffect(() => {
    console.log("window size change");
    const query = "(orientation: portrait)";
    const media = window.matchMedia(query);
    if (media.matches !== results) {
      setResults(media.matches);
    }

    const listener = () => setResults(media.matches);
    window.addEventListener("resize", listener); //check everytime window is resized

    return () => window.removeEventListener("resize", listener);
  }, []);

  return results;
};
