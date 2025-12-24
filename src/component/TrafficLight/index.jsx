import { useEffect, useRef, useState } from "react";

const predefinedColors = [
  { color: "red", time: 4000 },
  { color: "yellow", time: 500 },
  { color: "green", time: 3000 },
];
const TrafficLight = ({ colors = predefinedColors }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(2);
  const setIntervalId = useRef(null);

  useEffect(() => {
    const duration = colors[currentColorIndex]?.time;
    setTimeout(() => {
      const nextColor = (currentColorIndex + 1) % colors.length;
      setCurrentColorIndex(nextColor);
    }, duration);
    return () => {
      clearInterval(setIntervalId.current);
    };
  }, [currentColorIndex]);

  return (
    <div>
      {colors.map((color) => (
        <div
          key={color.color}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor:
              currentColorIndex === colors.indexOf(color)
                ? color.color
                : "gray",
            margin: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
