import "./index.css";
import one from "./assets/1.png";
import two from "./assets/2.jpeg";
import three from "./assets/3.png";
import four from "./assets/4.png";
import five from "./assets/5.png";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const intervalIdRef = useRef<any | null>(null);

  const getSlidesDetails = () => {
    const boxEl = boxRef?.current!;
    const slides = boxEl.children;
    const totalSlides = slides.length;
    return { slides, totalSlides };
  };

  const handlePrev = () => {
    clearInterval(intervalIdRef.current);
    setCurrentIndex((prev) => {
      const { slides, totalSlides } = getSlidesDetails();
      const newIndex = (prev - 1 + totalSlides) % totalSlides;

      [...slides].forEach((slide: Element, index: number) => {
        slide.setAttribute("data-active", (index === newIndex).toString());
      });
      return newIndex;
    });
    startSlidesRotation();
  };

  const handleNext = () => {
    clearInterval(intervalIdRef.current);
    setCurrentIndex((prev) => {
      const { slides, totalSlides } = getSlidesDetails();
      const newIndex = (prev + 1) % totalSlides;

      [...slides].forEach((slide: Element, index: number) => {
        slide.setAttribute("data-active", (index === newIndex).toString());
      });
      return newIndex;
    });
    startSlidesRotation();
  };

  const startSlidesRotation = () => {
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const { slides, totalSlides } = getSlidesDetails();
        const newIndex = (prev + 1) % totalSlides;

        [...slides].forEach((slide: Element, index: number) => {
          slide.setAttribute("data-active", (index === newIndex).toString());
        });
        return newIndex;
      });
    }, 3000);
  };

  const handleStepperClick = (slideIndex: number) => {
    const { slides } = getSlidesDetails();
    clearInterval(intervalIdRef.current);
    setCurrentIndex(slideIndex);
    [...slides].forEach((slide: Element, index: number) => {
      slide.setAttribute("data-active", (index === slideIndex).toString());
    });
    startSlidesRotation();
  };

  const renderStepper = () => {
    if (!boxRef?.current) return false;
    const { totalSlides } = getSlidesDetails();

    const data = Array.from(
      { length: totalSlides },
      (_: any, index: number) => {
        return index + 1;
      }
    );

    return (
      <div>
        {data.map((i: number) => {
          return (
            <button
              style={{
                backgroundColor: `${
                  i === currentIndex ? "burlywood" : "inherit"
                }`,
              }}
              key={i}
              onClick={() => handleStepperClick(i)}
            ></button>
          );
        })}
      </div>
    );
  };

  const handleMouseEnter = () => {
    clearInterval(intervalIdRef.current);
  };

  const handleMouseLeave = () => {
    startSlidesRotation();
  };

  useEffect(() => {
    const boxEl = boxRef?.current!;
    const slides = boxEl.children;
    slides?.[0].setAttribute("data-active", "true");

    return () => clearInterval(intervalIdRef.current);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-container">
        <button onClick={handlePrev}>Prev</button>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="box"
          ref={boxRef}
        >
          {children}
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
      {/* <div className="carousel-stepper">{renderStepper()}</div> */}
    </div>
  );
};

export default Carousel;

export const CarouselDemo = () => {
  return (
    <Carousel>
      <img className="carousel-img" src={one} />
      <img className="carousel-img" src={two} />
      <img className="carousel-img" src={three} />
      <img className="carousel-img" src={four} />
      <img className="carousel-img" src={five} />
    </Carousel>
  );
};
