import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const list = ["apple", "banana", "chickoo", "pineapple"];
const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const containerRef = useRef();

  useClickOutside([containerRef], handleClose);
  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleButtonKeyDown = (e) => {
    console.log("🚀 ~ handleButtonKeyDown ~ e:", e.key);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default browser behavior (like scrolling page)

      if (!open) {
        // If dropdown is closed, open it and focus first option
        setOpen(true);
        setFocusedOptionIndex(0);
      } else {
        // If dropdown is open, move to next option
        // Using modulo to wrap around to first option when at the end
        setFocusedOptionIndex((prev) => (prev + 1) % list.length);
      }
    }
    // When user presses Arrow Up
    else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default browser behavior

      if (open) {
        // Move to previous option
        // Using modulo to wrap around to last option when at the beginning
        setFocusedOptionIndex((prev) => (prev - 1 + list.length) % list.length);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={handleToggle}
        aria-labelledby="dropdown-button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onKeyDown={handleButtonKeyDown}
      >
        {selection || "Select a fruit"}
        <span style={{ float: "right" }}>&nbsp;{open ? "▲" : "▼"}</span>
      </button>
      <ul
        style={{
          position: "absolute",
          display: open ? "block" : "none",
          listStyle: "none",
          left: 0,
          padding: 0,
        }}
        role="listbox"
      >
        {list.map((l, index) => {
          const isSelected = selection === l;
          return (
            <li
              key={l}
              style={{
                border: `1px solid ${selection === l ? "lightcoral" : "black"}`,
                padding: "12px",
                cursor: "pointer",
                backgroundColor:
                  focusedOptionIndex === index
                    ? "gray"
                    : isSelected
                    ? "lightcoral"
                    : "inherit",
                zIndex: 10,
                color: `${selection === l ? "white" : "black"}`,
              }}
              role="option"
              aria-selected={isSelected}
              onClick={() => setSelection(l)}
              tabIndex={-1}
              onMouseEnter={() => setFocusedOptionIndex(index)}
              onMouseLeave={() => setFocusedOptionIndex(-1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setSelection(l);
                  handleToggle();
                }
              }}
            >
              {l}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
