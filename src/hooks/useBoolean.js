import { useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setFalse = setValue(false);
  const setTrue = setValue(true);

  return { value, setFalse, setTrue, toggle };
};
