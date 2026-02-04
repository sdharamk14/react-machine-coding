import { useEffect, useRef, useState } from "react";

function useTimer(totalTimer) {
  const [leftOverSec, setLeftOverSec] = useState(totalTimer);
  const intervalRef = useRef(null);

  const isRunning = intervalRef.current !== null;

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setLeftOverSec(totalTimer);
  }, [totalTimer]);

  const start = () => {
    if (intervalRef.current || leftOverSec <= 0) return;

    intervalRef.current = setInterval(() => {
      setLeftOverSec((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return {
    isRunning,
    leftOverSec,
    start,
    stop,
  };
}

export default useTimer;
