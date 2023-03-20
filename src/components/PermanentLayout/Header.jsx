import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import VEERlogo from "../../media/VEERlogo.png";
import { GrMenu } from "react-icons/gr";
import {RxCross2} from 'react-icons/rx';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);



  return (
    <Fragment>
        <header className="fixed top-0 left-0 h-20 w-screen z-40 border-b-2 border-solid border-red flex flex-row items-center justify-between">
            <img src={VEERlogo} alt="veer logo" className="h-16 w-auto ml-4" />
            <button onClick={() => setShowMenu(!showMenu)} className='text-2xl mr-8'>
                {showMenu ? <RxCross2 /> : <GrMenu />}
            </button>
        </header>
        <nav className={showMenu ? "absolute top-20 h-screen w-64 z-50 bg-white right-0 transition-all ease-in-out duration-300 border-l-2 border-solid border-red" : "absolute top-20 h-screen w-64 z-50 bg-white -right-64 transition-all ease-in-out duration-300"}>
          <NavLink to="#adventures" className="hover:text-red">
            Adventures
          </NavLink>
          <NavLink to="/profile" className="hover:text-red">
            Login
          </NavLink>
        </nav>
    </Fragment>
  );
};

export default Header;
