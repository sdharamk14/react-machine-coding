import { useEffect, useRef } from "react";

export const useIsFirstRender = () => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, []);

  return firstRenderRef.current;
};
