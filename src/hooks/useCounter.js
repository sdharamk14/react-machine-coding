import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);

  const reset = () => setCount(0);
  const increment = () => setCount((prev) => prev++);
  const decrement = () => setCount((prev) => prev--);

  return { reset, increment, decrement, count, setCount };
};
