import styles from "./InfiniteScroll.module.css";
import { useEffect, useRef } from "react";

function InfiniteScroll({ data, loading, setPage }) {
  //BAD Solution
  // function scrollHandler(e) {
  //   // console.log("Scroll Height ", e.target.scrollHeight);
  //   // console.log("Scroll Top ", e.target.scrollTop);
  //   // console.log("Subtact ", e.target.scrollHeight - e.target.clientHeight);
  //   const bottom =
  //     e.target.scrollHeight - e.target.clientHeight ===
  //     Math.floor(e.target.scrollTop);
  //   if (bottom) {
  //     setPage((page) => page + 1);
  //   }
  // }
  const ref = useRef(null);
  const tileRef = useRef(null);
  useEffect(() => {
    function handleIntersection(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
      }
    }
    const observer = new IntersectionObserver(handleIntersection, {
      root: ref.current,
      threshold: 1,
    });
    if (data && data.length > 0) {
      observer.observe(tileRef.current);
    }
  }, [data, setPage]);
  return (
    <div className={styles.scrollArea} ref={ref}>
      {data.map((entry, i) => (
        <Tile
          key={entry.key}
          entry={entry}
          innerRef={i === data.length - 1 ? tileRef : null}
        />
      ))}
      {loading && <h4>Loading...</h4>}
    </div>
  );
}

function Tile({ entry, innerRef }) {
  return (
    <div className={styles.tile} ref={innerRef}>
      {entry.title}
    </div>
  );
}

export default InfiniteScroll;
