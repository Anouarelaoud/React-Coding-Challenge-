import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const items = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Types",
    path: "/types",
  },
];

function Navbar() {
  return (
    <header className={styles.nav}>
      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.label} className={styles.item}>
            <Link className={styles.link} to={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Navbar;
