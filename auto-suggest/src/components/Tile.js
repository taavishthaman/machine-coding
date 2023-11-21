import styles from "./Tile.module.css";

function Tile({ title, query }) {
  if (!query) {
    return <div>{title}</div>;
  }
  const startIdx = title.toLowerCase().indexOf(query.toLowerCase());
  const endIdx = startIdx + query.length;
  console.log("Start ", startIdx);
  console.log("End ", endIdx);
  return (
    <div className={styles.tile}>
      <span>{title.substr(0, startIdx)}</span>
      <span className={styles.bold}>
        {title.substr(startIdx, query.length)}
      </span>
      <span>{title.substr(endIdx)}</span>
    </div>
  );
}

export default Tile;
