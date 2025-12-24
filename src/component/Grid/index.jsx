import { useRef, useState } from "react";
import "./index.css";

const Grid = () => {
  const [initialSequence, setInitialSequence] = useState([
    [0, 0, 0],
    [0, 0],
    [0, 0, 0],
  ]);
  const [clickedSequence, setClickedSequence] = useState([]);
  const deactivationSequenceReq = useRef(0);

  const handleClick = (row, column) => {
    if (!initialSequence[row][column]) {
      setInitialSequence((prev) => {
        prev[row][column] = 1;
        return prev;
      });
      setClickedSequence([[row, column].toString(), ...clickedSequence]);
    }

    deactivationSequenceReq.current += 1;
    if (deactivationSequenceReq.current === 8) {
      const intervalId = setInterval(() => {
        setClickedSequence((prev) => {
          const key = prev.at(0);
          const [row, column] = key.split(",");
          setInitialSequence((prev) => {
            prev[row][column] = 0;
            return prev;
          });
          const leftSequence = prev.filter((item) => item !== key);
          if (!leftSequence.length) {
            clearInterval(intervalId);
            deactivationSequenceReq.current = 0;
          }
          return leftSequence;
        });
      }, 1000);
    }
  };

  const getStyle = (row, column) => {
    let styles = {};
    const hasValue = initialSequence[row][column];
    if (hasValue === 1) {
      styles = {
        backgroundColor: "green",
      };
    }
    return styles;
  };

  return (
    <div className="container">
      <div className="row">
        {new Array(3).fill(1).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(0, index)}
              style={getStyle(0, index)}
              disabled={initialSequence[0][index]}
            ></button>
          );
        })}
      </div>
      <div className="row">
        {new Array(2).fill(1).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(1, index)}
              style={getStyle(1, index)}
              disabled={initialSequence[1][index]}
            ></button>
          );
        })}
      </div>
      <div className="row">
        {new Array(3).fill(1).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(2, index)}
              style={getStyle(2, index)}
              disabled={initialSequence[2][index]}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
