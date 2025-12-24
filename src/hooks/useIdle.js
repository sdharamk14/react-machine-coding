import { useCallback, useEffect, useRef, useState } from "react";

const useIdle = (timeoutTime = 2000) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutIdRef = useRef();

  const reset = useCallback(() => {
    setIsIdle(false);
    if (timeoutIdRef) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      setIsIdle(true);
    }, [timeoutTime]);
  }, []);

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "scroll"];

    events.map((e) => {
      window.addEventListener(e, reset);
    });

    reset();

    return () => {
      events.map((e) => {
        window.removeEventListener(e, reset);
        clearTimeout(timeoutIdRef.current);
      });
    };
  }, []);

  return [isIdle, reset];
};

export default useIdle;
