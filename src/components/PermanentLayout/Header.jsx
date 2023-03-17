import React from "react";
import { NavLink } from "react-router-dom";
import VEERlogo from '../../media/VEERlogo.png'
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={VEERlogo} alt="" className={styles.logo} />
      <nav className={styles.nav}>
        <NavLink to="#adventures" className={styles.navlink}>Adventures</NavLink>
        <NavLink to="/profile" className={styles.navlink}>Login</NavLink>
      </nav>
    </header>
  );
};

export default Header;
