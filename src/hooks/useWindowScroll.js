import { useEffect } from "react";

export const useWindowScroll = () => {
  const [scrollState, setScrollState] = useState({
    x: null,
    y: null,
  });

  function handleScroll() {
    setScrollState({
      x: window.scrollX,
      y: window.scrollY,
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [scrollState];
};
