import { useEffect, useState } from "react";

export const useClickAnywhere = () => {
  const [clickCount, setClickCount] = useState(0);

  function handleClick() {
    setClickCount((prev) => prev + 1);
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return { clickCount };
};
