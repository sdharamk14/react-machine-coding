import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalIdRef = useRef<null | any>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      if (!startTimeRef.current) {
        startTimeRef.current = new Date().getTime();
      }
      intervalIdRef.current = setInterval(() => {
        setTime(new Date().getTime() - startTimeRef.current);
      }, 10);

      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      };
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    startTimeRef.current = 0;
    setTime(0);
    setIsRunning(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const pad = (str: number | string) => str.toString().padStart(2, "0");

  const formatTime = () => {
    /*
        ms 1234 % 1000 -> 234 / 10 -> 23.4
        sec 61234 / 1000 -> 6123 % 60
    */
    const ms = Math.floor((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);
    const displaySeconds = Math.floor(totalSeconds % 60);
    const mins = Math.floor(totalSeconds / 60);
    const displayMins = mins % 60;
    const hr = Math.floor(mins / 60);

    // const ms = Math.floor((time % 1000) / 10);
    // const sec = Math.floor(time / (1000 % 60));
    // const min = Math.floor(time / ((1000 * 60) % 60));
    // const hr = Math.floor(time / (1000 * 60 * 60));
    // const;

    return `${pad(hr)}:${pad(displayMins)}:${pad(displaySeconds)}:${pad(ms)}`;
  };

  return (
    <div>
      <p>{formatTime()}</p>
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
