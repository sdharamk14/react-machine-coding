import React, { useState } from "react";
import { fileData } from "./data";
import Checkbox from "./Checkbox";

const CheckboxItem = ({ checkboxData = fileData }) => {
  const [checkboxList, setCheckboxList] = useState(checkboxData);

  const updateCheckboxes = (
    checkboxes,
    id,
    markChildrenChecked = false,
    parentId = ""
  ) => {
    const newCheckbox = JSON.parse(JSON.stringify(checkboxes));
    for (const item of newCheckbox) {
      if (parentId) {
        item.checked = markChildrenChecked;
        if (item.children?.length > 0) {
          item.children = updateCheckboxes(
            item.children,
            id,
            markChildrenChecked,
            item.id
          );
        }
      }

      if (item.id === id) {
        item.checked = !item.checked;
        markChildrenChecked = item.checked;
        if (item.children?.length > 0) {
          item.children = updateCheckboxes(
            item.children,
            id,
            markChildrenChecked,
            item.id
          );
        }
      } else if (item.children?.length > 0) {
        item.children = updateCheckboxes(
          item.children,
          id,
          markChildrenChecked
        );
      }

      if (item.children?.length > 0) {
        const showIndeterminateState = checkIndeterminateState(item.children);
        const allChildrenChecked = item?.children?.every(
          (child) =>
            typeof child.checked === "boolean" && child.checked === true
        );
        if (allChildrenChecked) {
          item.checked = allChildrenChecked;
        } else {
          item.checked = showIndeterminateState
            ? "indeterminate"
            : showIndeterminateState;
        }
      }
    }
    return newCheckbox;
  };

  const handleChange = (id) => {
    return () => {
      const newCheckboxItems = updateCheckboxes(checkboxList, id);
      setCheckboxList(newCheckboxItems);
    };
  };

  const checkIndeterminateState = (checkboxItems) => {
    return (
      checkboxItems.some((item) => item.checked === "indeterminate") ||
      (checkboxItems?.some((item) => item.checked === true) &&
        !checkboxItems?.every((item) => item.checked !== true))
    );
  };

  const renderNestedCheckboxes = (checkboxItems, padding = 0) => {
    return checkboxItems?.map((item) => {
      const parentItem = (
        <React.Fragment key={item.id}>
          <Checkbox item={item} handleChange={handleChange} padding={padding} />
          {item.children &&
            renderNestedCheckboxes(item.children, padding + 10, item.id)}
        </React.Fragment>
      );
      return parentItem;
    });
  };
  return <div>{renderNestedCheckboxes(checkboxList ?? [])}</div>;
};

export default CheckboxItem;

// const renderCheckboxes = (checkboxItems, padding = 0) => {
//   return checkboxItems?.map((item) => {
//     const parentItem = (
//       <div
//         key={item.id}
//         style={{
//           paddingLeft: padding,
//         }}
//       >
//         <div>
//           <input
//             type="checkbox"
//             id={item.id}
//             checked={item.checked === true}
//             onChange={handleChange(item.id)}
//             ref={(el) => {
//               checkboxRefs.current.set(item.id, el);
//               if (el) {
//                 const parentCheckbox = checkboxRefs.current.get(item.id);
//                 parentCheckbox.indeterminate =
//                   typeof item.checked === "string" &&
//                   item.checked === "indeterminate";
//               }
//             }}
//           />
//           <label htmlFor={item.id} style={{ paddingLeft: 5 }}>
//             {item.name}
//           </label>
//         </div>
//         {item.children &&
//           renderCheckboxes(item.children, padding + 10, item.id)}
//       </div>
//     );
//     return parentItem;
//   });
// };
