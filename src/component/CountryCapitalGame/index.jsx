import { useState } from "react";
import { countryCapitals } from "./data";

const CountryCapitalGame = () => {
  const [list] = useState(countryCapitals);
  const [pair, setPair] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedPair, setSelectedPair] = useState([]);
  const countries = Object.keys(list);
  const capitals = Object.values(list);

  const resetGame = () => {
    setPair([]);
    setHasError(false);
    setIsCorrect(false);
    setSelectedPair([]);
  };

  const handleClick = (key, value) => {
    const tempPair = [...pair, value];
    if (tempPair.length === 2) {
      if (
        tempPair[0] === list[tempPair[1]] ||
        tempPair[1] === list[tempPair[0]]
      ) {
        setIsCorrect(true);
        setTimeout(() => {
          setSelectedPair((prev) => [...prev, ...tempPair]);
          setIsCorrect(false);
          setPair([]);
        }, 1000);
      } else {
        setHasError(true);
        setTimeout(() => {
          setHasError(false);
          setPair([]);
        }, 2000);
      }
    }
    setPair(tempPair);
  };

  const renderChips = (list, key) => {
    return list
      .filter((item) => !selectedPair.includes(item))
      .map((item) => {
        let style = { margin: 5, padding: "5px", border: "1px solid #ccc" };
        if (pair.includes(item)) {
          style = { ...style, border: "1px solid blue" };
        }
        if (hasError && pair.includes(item)) {
          style = { ...style, border: "1px solid red" };
        }
        if (isCorrect && pair.includes(item)) {
          style = { ...style, border: "1px solid green" };
        }
        return (
          <button
            onClick={() => handleClick(key, item)}
            key={item}
            style={style}
            disabled={selectedPair.includes(item) || hasError || isCorrect}
          >
            {item}
          </button>
        );
      });
  };

  if (selectedPair.length / 2 === countries.length) {
    return (
      <div>
        <h2>Congratulations!</h2>
        <button onClick={resetGame}>Reset Game!</button>
      </div>
    );
  }
  return (
    <div>
      {renderChips(countries, "country")}
      {renderChips(capitals, "capital")}
    </div>
  );
};

export default CountryCapitalGame;
