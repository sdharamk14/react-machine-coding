import { useState } from "react";
const predefinedList = {
  source: ["html", "css", "javascript", "typescript"],
  target: ["react", "vue", "angular", "svelte"],
};
const TransferList = ({
  source = predefinedList.source,
  target = predefinedList.target,
}) => {
  const [targetList, setTargetList] = useState(target);
  const [sourceList, setSourceList] = useState(source);
  const [sourceSelectedItems, setSourceSelectedItems] = useState([]);
  const [targetSelectedItems, setTargetSelectedItems] = useState([]);

  const renderList = (list, type) => {
    return list.map((item) => {
      return (
        <div
          key={item}
          style={{
            display: "flex",
            gap: "10px",
            flex: "1",
            alignItems: "center",
          }}
        >
          <input
            name={item}
            type="checkbox"
            checked={
              type === "source"
                ? sourceSelectedItems.includes(item)
                : targetSelectedItems.includes(item)
            }
            onChange={handleOnChange(type, item)}
          />
          <label>{item}</label>
        </div>
      );
    });
  };

  const handleOnChange = (type, key) => {
    return (e) => {
      if (type === "source") {
        if (e.target.checked) {
          setSourceSelectedItems([...sourceSelectedItems, key]);
        } else {
          setSourceSelectedItems((items) =>
            items.filter((item) => item !== key)
          );
        }
      } else {
        if (e.target.checked) {
          setTargetSelectedItems([...targetSelectedItems, key]);
        } else {
          setTargetSelectedItems((items) =>
            items.filter((item) => item !== key)
          );
        }
      }
    };
  };

  const transferAllToLeft = () => {
    if (!targetList.length) return false;
    const newSourceList = [...sourceList, ...targetList];
    const newTargetList = [];

    setSourceSelectedItems([...sourceSelectedItems, ...targetSelectedItems]);
    setTargetSelectedItems([]);
    setSourceList(newSourceList);
    setTargetList(newTargetList);
  };

  const transferAllToRight = () => {
    if (!sourceList.length) return false;
    const newTargetList = [...sourceList, ...targetList];
    const newSourceList = [];

    setTargetSelectedItems([...targetSelectedItems, ...sourceSelectedItems]);
    setSourceSelectedItems([]);
    setSourceList(newSourceList);
    setTargetList(newTargetList);
  };

  const transferToLeft = () => {
    if (!targetSelectedItems.length) return false;

    const newSourceList = [...sourceList, ...targetSelectedItems];
    const newTargetList = targetList.filter(
      (t) => !targetSelectedItems.includes(t)
    );

    setSourceSelectedItems([...sourceSelectedItems, ...targetSelectedItems]);
    setTargetSelectedItems([]);
    setSourceList(newSourceList);
    setTargetList(newTargetList);
  };

  const transferToRight = () => {
    if (!sourceSelectedItems.length) return false;

    const newTargetList = [...targetList, ...sourceSelectedItems];
    const newSourceList = sourceList.filter(
      (t) => !sourceSelectedItems.includes(t)
    );

    setSourceSelectedItems([]);
    setTargetSelectedItems([...targetSelectedItems, ...sourceSelectedItems]);
    setSourceList(newSourceList);
    setTargetList(newTargetList);
  };

  return (
    <div className="transfer-list" style={{ display: "flex", gap: 20 }}>
      <div
        className="transfer-list__body"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {renderList(sourceList, "source")}
      </div>
      <div
        className="transfer-list__action"
        style={{
          display: "flex",
          gap: 10,
          padding: 10,
          border: "1px solid black",
          flexDirection: "column",
        }}
      >
        <button
          title="transfer items to left"
          style={{ border: "1px solid gray" }}
          onClick={transferAllToLeft}
        >
          {"<<"}
        </button>
        <button
          title="transfer selected items to right"
          style={{ border: "1px solid gray" }}
          onClick={transferToRight}
        >
          {">"}
        </button>
        <button
          title="transfer selected items to left"
          style={{ border: "1px solid gray" }}
          onClick={transferToLeft}
        >
          {"<"}
        </button>
        <button
          title="transfer items to right"
          style={{ border: "1px solid gray" }}
          onClick={transferAllToRight}
        >
          {">>"}
        </button>
      </div>

      <div
        className="transfer-list__body"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {renderList(targetList, "target")}
      </div>
    </div>
  );
};

export default TransferList;
