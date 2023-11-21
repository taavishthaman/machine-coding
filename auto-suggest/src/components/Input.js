import styles from "./Input.module.css";

function Input({ handleInput, setQuery, query }) {
  return (
    <input
      className={styles.input}
      onChange={(e) => handleInput(e)}
      value={query}
    ></input>
  );
}

export default Input;
