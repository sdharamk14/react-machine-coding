import { useEffect } from "react";
import useTimer from "../../hooks/useTimer";

const Timer = () => {
  const data = useTimer(10);

  useEffect(() => {
    data.start();
    return () => {
      data.stop();
    };
  });

  return (
    <h1>
      Time: {data.leftOverSec}
      <br />
      Running: {data.isRunning.toString()}
    </h1>
  );
};

export default Timer;
