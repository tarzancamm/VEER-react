import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>VEER</h1>
            <nav>
                <NavLink to='#adventures'>Adventures</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </nav>
        </header>
    )
}

export default Header