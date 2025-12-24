import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutId = useRef();

  const copyToClipboard = useCallback(async (text) => {
    if (!window.navigator.clipboard) {
      setIsCopied(false);
      throw new Error("Copy to clipboard function is not supported");
    } else {
      try {
        await window.navigator.clipboard.writeText(text);
        setIsCopied(true);
        timeoutId.current = setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (e) {
        setIsCopied(false);
        throw new Error("Copy to clipboard function is not supported");
      }
    }
  }, []);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  return [isCopied, copyToClipboard];
};
