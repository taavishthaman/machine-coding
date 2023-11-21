import AutoSuggest from "../components/AutoSuggest";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <AutoSuggest />
    </div>
  );
}

export default AppLayout;
