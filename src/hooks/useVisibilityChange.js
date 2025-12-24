import { useEffect, useState } from "react";

export const useVisibilityChange = () => {
  const [visibility, setVisibility] = useState(!document.hidden);

  const handuleChangeVisibility = () => {
    setVisibility(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleChangeVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleChangeVisibility);
    };
  }, []);

  return [visibility];
};
