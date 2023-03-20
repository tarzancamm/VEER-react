import React from "react";
import { NavLink } from "react-router-dom";
import VEERlogo from '../../media/VEERlogo.png'
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={VEERlogo} alt="veer logo" className='ml-16 h-16 w-auto' />
      <nav className='flex flex-row gap-8 mr-20'>
        <NavLink to="#adventures" className='hover:text-red'>Adventures</NavLink>
        <NavLink to="/profile" className='hover:text-red'>Login</NavLink>
      </nav>
    </header>
  );
};

export default Header;
