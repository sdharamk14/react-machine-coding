import { useState } from "react";
import { data } from "./data";

const reorderFileList = (fileList) => {
  const files = [];
  const directories = [];
  for (const item of fileList) {
    if (item.children?.length > 0) {
      item.children = reorderFileList(item.children);
      item.open = false;
      directories.push(item);
    } else {
      files.push(item);
    }
  }
  return [...directories, ...files];
};
const FileExplorer = () => {
  const [fileList, setFileList] = useState(() => {
    return reorderFileList(data);
  });

  const setOpenDirectory = (list, id) => {
    return list.map((item) => {
      if (item.id === id) {
        return { ...item, open: !item.open };
      } else if (item.children?.length > 0) {
        return { ...item, children: setOpenDirectory(item.children, id) };
      }
      return item;
    });
  };

  const handleOpen = (id) => {
    setFileList((prev) => setOpenDirectory(prev, id));
  };

  const renderFileList = (fileList, padding = 0) => {
    return fileList.map((item) => {
      const hasChildren = item.children?.length > 0;
      const styles = hasChildren ? { cursor: "pointer", fontWeight: 700 } : {};
      let additionalText = "";
      if (hasChildren) {
        additionalText = !item.open ? `[+]` : `[-]`;
      }
      return (
        <div key={item.id} style={{ paddingLeft: padding }}>
          <label
            htmlFor={item.id}
            style={styles}
            role="button"
            onClick={() => hasChildren && handleOpen(item.id)}
          >
            {item.name} {additionalText}
          </label>
          {hasChildren && item.open && (
            <div>{renderFileList(item.children, padding + 10)}</div>
          )}
        </div>
      );
    });
  };
  return <div>{renderFileList(fileList ?? [])}</div>;
};

export default FileExplorer;
