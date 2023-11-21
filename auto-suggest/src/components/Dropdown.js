import styles from "./Dropdown.module.css";
import Tile from "./Tile";

function Dropdown({ searchData, handleClick, query, innerRef }) {
  return (
    <div className={styles.dropdown}>
      {searchData.map((emp) => (
        // <p className={styles.tile}>{/* {emp.designation.title} */}</p>
        <Tile title={emp.designation.title} query={query} />
      ))}
    </div>
  );
}

export default Dropdown;
