import { useState } from "react";

const useCycle = (array) => {
  const [index, setIndex] = useState(0);

  const changeCycleMode = () => {
    setIndex((prev) => (prev + 1) % array.length);
  };

  return { cycle: array[index], changeCycleMode };
};
