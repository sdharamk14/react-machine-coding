import { useState } from "react";

const tabItems = [
  {
    title: "Basic Javascript",
    content: "Under this course you would javascript",
  },
  { title: "Learn React JS", content: "Under this course you would react" },
  { title: "Nextjs", content: "Under this course you would nextjs" },
  {
    title: "Learn MEAN fullstack course",
    content: "Under this course you would MEAN fullstack",
  },
];

type Item = {
  title: string;
  content: string;
};

type TabProps = {
  items?: Item[];
};
const Tabs = (props: TabProps) => {
  const { items = tabItems } = props;
  const [active, setActive] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ul
        style={{
          display: "flex",
          border: "1px solid black",
          padding: 0,
        }}
      >
        {items.map((item, index) => {
          return (
            <button
              key={item.title}
              onClick={() => setActive(index)}
              style={{
                backgroundColor: `${active === index ? "green" : ""}`,
                color: `${active === index ? "white" : ""}`,
                border: "1px solid transparent !important",
                borderRadius: 0,
                outline: "none",
              }}
            >
              {item.title}
            </button>
          );
        })}
      </ul>
      {items?.at(active)?.content}
    </div>
  );
};

export default Tabs;
