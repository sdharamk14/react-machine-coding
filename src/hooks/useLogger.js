import { useEffect, useRef } from "react";

export const useLogger = (value, label) => {
  const valueRef = useRef(null);

  useEffect(() => {
    if (valueRef.current !== value) {
      const str = `${label ? `[useLogger] ${label}` : "[useLogger]"} `;
      console.log(str, value);
      valueRef.current = value;
    }
  }, [value, label]);
};
