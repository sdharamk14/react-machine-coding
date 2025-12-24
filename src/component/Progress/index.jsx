import { useEffect, useRef, useState } from "react";
import "./index.css";

export default function Progress(props) {
  const {
    value = 0,
    max = 100,
    onStart = () => {},
    onComplete = () => {},
  } = props;
  const [percent, setPercent] = useState(value);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (!intervalIdRef.current) {
      onStart();
      intervalIdRef.current = setInterval(() => {
        setPercent((prev) => {
          const value = +prev + 1;
          return Math.min(max, Math.max(value, 0));
        });
      }, 100);
    }

    // return () => {
    //   clearInterval(intervalIdRef.current);
    // };
  }, []);

  useEffect(() => {
    if (percent >= max) {
      onComplete();
    }
  }, [percent]);

  return (
    <div className="progress-bar">
      <span
        className="progress-bar-value"
        style={{ color: `${percent > 49 ? "white" : "black"}` }}
      >
        {percent}%
      </span>
      <div style={{ width: `${percent}%` }} className="progress-value"></div>
    </div>
  );
}
