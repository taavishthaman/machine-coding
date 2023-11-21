import styles from "./AppLayout.module.css";
import InfiniteScroll from "./InfiniteScroll";
import TextField from "./TextField";
import { useEffect, useState } from "react";

function AppLayout() {
  const [query, setQuery] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData(query) {
      try {
        setIsLoading(true);
        setError("");
        const url = `https://openlibrary.org/search.json?q=${query}&page=${page}`;
        const res = await fetch(url, { signal: controller.signal });
        const dataNew = await res.json();
        setData((data) => {
          return [...data, ...dataNew.docs];
        });
        setError("");
        setIsLoading(false);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      }
    }

    if (!query || query.length < 3) {
      setIsLoading(false);
    } else {
      fetchData(query);
    }
    return function () {
      controller.abort();
    };
  }, [page, query]);

  // useEffect(() => {
  //   setData([]);
  //   setPage(1);
  // }, [query]);
  return (
    <div className={styles.layout}>
      <TextField setQuery={setQuery} />
      <InfiniteScroll data={data} loading={isLoading} setPage={setPage} />
    </div>
  );
}

export default AppLayout;
