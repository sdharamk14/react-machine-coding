import { useEffect, useRef } from "react";

const Checkbox = ({ item, padding = 0, handleChange }) => {
  const checkboxRef = useRef(null);
  useEffect(() => {
    checkboxRef.current.indeterminate =
      typeof item.checked === "string" && item.checked === "indeterminate";
  });

  return (
    <div
      style={{
        paddingLeft: padding,
      }}
    >
      <div>
        <input
          type="checkbox"
          id={item.id}
          checked={item.checked === true}
          onChange={handleChange(item.id)}
          ref={checkboxRef}
        />
        <label htmlFor={item.id} style={{ paddingLeft: 5 }}>
          {item.name}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
