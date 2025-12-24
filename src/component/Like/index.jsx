import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";
import "./like.css";

// default | loading | hover | success or failure
export default function Like() {
  const [state, setState] = useState("unlike");
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    const newState = state === "unlike" ? "like" : "unlike";
    try {
      setLoading(true);
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "post",
          body: JSON.stringify({ action: newState }),
        }
      );
      const data = await response.json();
      if (data.message === "Success!") {
        setState(newState);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  let className = state === "like" ? ["like"] : ["unlike"];
  className = [...className, "button"].join(" ");

  return (
    <div>
      {!loading && (
        <button data-state={state} onClick={handleButton} className={className}>
          <HeartIcon /> Like
        </button>
      )}
      {loading && (
        <button data-state={state} className={className}>
          <SpinnerIcon /> Like
        </button>
      )}
    </div>
  );
}
