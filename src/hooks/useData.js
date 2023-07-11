import { useState, useEffect } from "react";

export function useData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [taskError, setTaskError] = useState("");

  useEffect(() => {
    async function fetching() {
      try {
        setisLoading(true);
        const responce = await fetch(url);
        const tasks = await responce.json();
        setData(tasks);
      } catch (e) {
        setTaskError(e.message);
      } finally {
        setisLoading(false);
      }
    }
    fetching();
  }, [url]);

  return [data, isLoading, taskError];
}
