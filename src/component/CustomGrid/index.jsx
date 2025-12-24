import { useState } from "react";

const CustomGrid = () => {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  const handleChange = (type = "row") => {
    return function (e) {
      const value = e.target;

      if (value >= 0 || value <= 100) {
        return false;
      }

      if (type === "row") {
        setRows(e.target.value);
      } else {
        setColumns(e.target.value);
      }
    };
  };

  const rowArr = Array.from({ length: rows }, (_, index) => index + 1);
  const columnArr = Array.from({ length: columns }, (_, index) => index + 1);

  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <div>
        <input
          type="number"
          value={rows}
          onChange={handleChange("row")}
          min={1}
          max={100}
        />
        <input
          type="number"
          value={columns}
          onChange={handleChange("column")}
          min={1}
          max={100}
        />
      </div>

      {columns &&
        rows &&
        rowArr.map((val) => {
          return (
            <div style={{ display: "flex", gap: 20 }} key={val}>
              {columnArr.map((val) => {
                return (
                  <div
                    key={val}
                    style={{
                      border: "1px solid black",
                      padding: 20,
                      "&::after": {
                        content: "red",
                      },
                    }}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default CustomGrid;
