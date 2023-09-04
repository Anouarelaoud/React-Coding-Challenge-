import React from "react";
import styles from "./styles.module.scss";

const SearchInput = (props) => {
  return <input className={styles.input} {...props} />;
};

export default SearchInput;
