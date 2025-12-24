import { useCallback, useState } from "react";

export const useToggle = (initialValue) => {
  const [value, setValue] = useState(!!initialValue);

  const setToggle = useCallback(() => setValue((prev) => !prev), []);

  setTrue = () => setValue(true);
  setFalse = () => setValue(false);

  return [value, setToggle, setTrue, setFalse];
};
