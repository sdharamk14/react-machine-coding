import { useEffect, useRef, useState } from "react";
import "./infinitescroll.css";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const rowRef = useRef([]);
  const lastRowRef = useRef(null);

  const createArray = () => {
    return new Array(20).fill("");
  };

  const fetch = async () => {
    if (isLoading) return false;
    setIsLoading((prev) => !prev);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolve");
      }, 1000);
    });

    setItems((prev) => [...prev, ...createArray()]);
    setIsLoading((prev) => !prev);
  };

  const observerCallback = (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        fetch();
      }
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  // useEffect(() => {
  //   const observerObj = new IntersectionObserver(observerCallback, {
  //     threshold: 0.5,
  //   });
  //   const lastElement = rowRef.current.at(-1);
  //   if (lastElement) {
  //     observerObj.observe(lastElement);
  //   }

  //   return () => {
  //     observerObj.disconnect();
  //   };
  // }, [items.length, rowRef.current.length]);

  useEffect(() => {
    const observerObj = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
    const lastElement = lastRowRef.current;
    if (lastElement) {
      observerObj.observe(lastElement);
    }

    return () => {
      observerObj.disconnect();
    };
  }, [items.length]);

  return (
    <div className="infinite-scroll-container">
      {items.map((_, index) => (
        <p
          key={index + 1}
          // ref={(el) => (rowRef.current[index] = el)}
          ref={items.length === index + 1 ? lastRowRef : null}
          className={`infinite-scroll-row`}
        >
          {index + 1}
        </p>
      ))}
      {isLoading && <p>...Loading</p>}
    </div>
  );
};

export default InfiniteScroll;
