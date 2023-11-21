import styles from "./AutoSuggest.module.css";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { empData } from "../data/data";
import { useRef, useState } from "react";

function AutoSuggest() {
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const ref = useRef();
  function handleClick() {
    //setQuery(ref.current.innerText);
  }

  function handleInput(e) {
    const query = e.target.value;
    if (query.length > 0) {
      const filteredData = empData.filter((emp) => {
        if (emp.designation.title.toLowerCase().includes(query.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });

      setSearchData(filteredData);
      setQuery(query);
    } else {
      setSearchData([]);
      setQuery("");
    }
  }
  return (
    <div className={styles.autosuggest}>
      <Input handleInput={handleInput} setQuery={setQuery} query={query} />
      <Dropdown
        searchData={searchData}
        handleClick={handleClick}
        query={query}
        innerRef={ref}
      />
    </div>
  );
}

export default AutoSuggest;
