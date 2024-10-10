import { useEffect, useRef, useState } from "react";

import { ApiError, AbortRequestFn, apiHandler } from "../lib/api";
import { getPaginationLinks } from "../utils";
import { calculateRemaining } from "../utils/calculateRemainingTime";
import { MESSAGES } from "../constants";

export const useFetch = <T>(initialUrl: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  let abortFetchRequest: AbortRequestFn = () => {};
  const nextLinkRef = useRef<string | null>(null);
  const prevLinkRef = useRef<string | null>(null);

  const resetState = () => {
    setIsLoading(true);
    setData(null);
    setError("");
  };

  const fetchRequest = async (url: string = initialUrl) => {
    try {
      resetState();
      const { xhr, abortRequest } = apiHandler.get(url);
      abortFetchRequest = abortRequest;
      const response = await xhr;
      const { next, prev } = getPaginationLinks(response.headers.link);
      nextLinkRef.current = next;
      prevLinkRef.current = prev;
      setData([...(response.data?.items || response.data)]);
    } catch (e) {
      const error = e as ApiError;
      let message = error.message || MESSAGES.somethingWentWrong;
      if (!apiHandler.checkIsCancelError(error)) {
        const { response } = error;
        const isRateLimitError =
          response?.headers["x-ratelimit-remaining"] === "0";
        if (isRateLimitError) {
          message =
          MESSAGES.rateLimitExceeded +
            calculateRemaining(response?.headers["x-ratelimit-reset"]);
        }
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
    return () => {
      // cleanup function
      if (abortFetchRequest) {
        abortFetchRequest();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    callRequest: fetchRequest,
    nextLink: nextLinkRef.current,
    prevLink: prevLinkRef.current,
  };
};

