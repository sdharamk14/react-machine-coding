import { useEffect } from "react";

export const useClickOutside = (refs = [], handler) => {
  function handleClickEvent(e) {
    const isInsideAnyRef = refs.some(
      (ref) => ref.current && ref.current.contains(e.target)
    );
    if (!isInsideAnyRef) {
      handler(e);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickEvent);

    () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, [refs, handler]);

  return null;
};
