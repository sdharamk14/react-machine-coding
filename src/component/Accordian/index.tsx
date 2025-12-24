import { useState } from "react";

const accordianItems = [
  { title: "Basic Javascript", content: "Under this course you would learn" },
  { title: "Learn React JS", content: "Under this course you would learn" },
  { title: "Nextjs", content: "Under this course you would learn" },
  {
    title: "Learn MEAN fullstack course",
    content: "Under this course you would learn",
  },
];

type Item = {
  title: string;
  content: string;
};

type AccordianProps = {
  items?: Item[];
};

const Accordian = (props: AccordianProps) => {
  const { items = accordianItems } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: 300, gap: 20 }}
      role="listbox"
    >
      {items?.map((item) => {
        const isActive = active === item.title;
        return (
          <div
            key={item.title}
            style={{ display: "flex", flexDirection: "column" }}
            role="listitem"
          >
            <button
              style={{ border: "1px solid black", display: "flex" }}
              onClick={() => {
                if (active === item.title) {
                  setActive(null);
                } else {
                  setActive(item.title);
                }
              }}
              aria-expanded={isActive}
              role="button"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {item.title} {isActive ? ">" : "^"}
              </div>
            </button>
            {isActive && <div>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
