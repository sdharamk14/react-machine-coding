import { useEffect, useRef, useState } from "react";

const cached = new Map<string, any>();
const useFetch = ({
  url,
  config = {},
  enabled = true,
  revalidateOnFocus = true,
}: {
  url: string;
  config?: Record<string, any>;
  enabled?: boolean;
  revalidateOnFocus?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | any>(null);
  const [error, setError] = useState<null | any>(null);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFetch = async () => {
    if (!url || !enabled) return;

    setLoading(true);
    if (cached.has(url)) {
      setData(cached.get(url));
      setLoading(false);
    }

    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch(url, {
        ...config,
        signal: abortControllerRef.current.signal,
      });
      const jsonResponse = await response.json();
      if (isMountedRef.current) {
        setData(jsonResponse);
        setError(null);
        cached.set(url, jsonResponse);
      }
    } catch (error: any) {
      if (error.name === "AbortError") return;
      if (isMountedRef.current) {
        setError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  function handleRefetchOnFocus() {
    if (!enabled) return;
    if (!revalidateOnFocus) return;
    if (isMountedRef.current) {
      handleFetch();
    }
  }

  useEffect(() => {
    if (!revalidateOnFocus) return;
    window.addEventListener("focus", handleRefetchOnFocus);

    return () => {
      window.removeEventListener("focus", handleRefetchOnFocus);
    };
  }, [url, enabled, revalidateOnFocus]);

  useEffect(() => {
    isMountedRef.current = true;
    handleFetch();

    return () => {
      abortControllerRef.current?.abort();
      isMountedRef.current = false;
    };
  }, [url, enabled]);

  return { loading, error, data };
};

export default useFetch;
