import { MutableRefObject, useState, useEffect } from "react";

export default function useOnScreen<T extends Element>(
  ref: MutableRefObject<T | any>,
  rootMargin: string = "0px"
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    const refCurrent = ref.current;
    if (refCurrent) {
      observer.observe(refCurrent);
    }
    return () => {
      observer.unobserve(refCurrent);
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
