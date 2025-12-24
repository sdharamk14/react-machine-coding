import { useState } from "react";
import StarIcon from "./star";
import "./star-rating.css";

const StarRating = ({ number = 5, onSelection = () => {} }) => {
  const stars = new Array(number).fill("");
  const [selectionIndex, setSelectionIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleSelection = (index) => {
    return () => {
      setSelectionIndex(index);
      onSelection(index + 1);
    };
  };

  const handleHoverSelection = (index) => {
    return () => {
      setHoverIndex(index);
    };
  };

  const resetHoverSelection = () => {
    setHoverIndex(-1);
  };

  const renderStar = () => {
    return stars.map((_, index) => {
      let classes = "";
      if (selectionIndex !== null) {
        classes = selectionIndex >= index ? classes.concat(" active") : classes;
      }

      if (hoverIndex !== -1) {
        classes = hoverIndex >= index ? classes.concat(" hover") : classes;
      } else {
        classes = classes.replace("hover", "");
      }

      return (
        <StarIcon
          key={index + 1}
          onClick={handleSelection(index)}
          onMouseEnter={handleHoverSelection(index)}
          onMouseLeave={resetHoverSelection}
          className={classes}
          value={index}
        />
      );
    });
  };

  return <div>{renderStar()}</div>;
};

export default StarRating;
