import React from "react";

const CustomCase = ({ value, children }) => {
  return <div>{children}</div>;
};

const DefaultCase = ({ children }) => {
  return <div>{children}</div>;
};

const SwitchCase = ({ value, children }) => {
  const componentList = [];
  let DefaultComponent = null;
  if (!children && children.length === 0) return null;

  children.forEach((element) => {
    if (element.type.name === "CustomCase") {
      const propVal = element.props.value;
      if (typeof propVal === "function") {
        if (propVal(value)) {
          componentList.push(element);
        }
      } else if (propVal === value) {
        componentList.push(element);
      }
    } else {
      DefaultComponent = element;
    }
  });

  if (componentList.length === 0) {
    return React.cloneElement(DefaultComponent);
  } else {
    return componentList.map((element) => React.cloneElement(element));
  }
};

SwitchCase.CustomCase = CustomCase;
SwitchCase.DefaultCase = DefaultCase;

export default SwitchCase;
