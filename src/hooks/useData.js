import { useState } from "react";

export const useData = (callback) => {
  const [isLoading, setisLoading] = useState(false);
  const [taskError, setTaskError] = useState("");

  const fetching = async () => {
    try {
      setisLoading(true);
      await callback();
    } catch (e) {
      setTaskError(e.message);
    } finally {
      setisLoading(false);
    }
  };

  return [fetching, isLoading, taskError];
};
