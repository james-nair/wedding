import { useEffect, useState } from "react";

export const useIsPortrait = () => {
  const [results, setResults] = useState<boolean>();

  useEffect(() => {
    if (results === undefined) {
      setResults(window.matchMedia("(orientation: portrait)").matches);
    }
  }, []);

  return results;
};
