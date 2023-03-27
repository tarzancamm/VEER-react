import React, { useState, Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import VEERlogo from "../../media/VEERlogo.png";
import { GrMenu } from "react-icons/gr";
import {RxCross2} from 'react-icons/rx';
import {CgProfile} from 'react-icons/cg';
import AuthContext from "../../store/authContext";

const Header = ({openModal}) => {
  const [showMenu, setShowMenu] = useState(false);
  const authCtx = useContext(AuthContext)

  const closeMenuHandler = () => setShowMenu(false);

  return (
    <Fragment>
        <header className="fixed top-0 left-0 h-20 w-screen z-40 border-b-2 border-solid border-red flex flex-row items-center justify-between">
            <img src={VEERlogo} alt="veer logo" className="h-16 w-auto ml-4" />
            <button onClick={() => setShowMenu(!showMenu)} className='text-2xl mr-8'>
                {showMenu ? <RxCross2 /> : <GrMenu />}
            </button>
        </header>
        <nav className={showMenu ? "absolute h-screen w-64 top-20 z-40 bg-white right-0 transition-all ease-in-out duration-300 border-l-2 border-solid border-red flex flex-col gap-4" : "absolute h-screen w-64 z-40 bg-white -right-64 transition-all ease-in-out duration-300"}>
          <NavLink to="#map" onClick={closeMenuHandler} className="hover:text-red ml-8 mt-8">
            Adventures
          </NavLink>
          <NavLink to="/profile" onClick={closeMenuHandler} className="hover:text-red ml-8">
            Profile
          </NavLink>
          <button className="ml-8 flex" onClick={openModal}>
            <div className="pr-2">
                <CgProfile />
            </div>
            <p>login / signup</p>
          </button>
          <div className="flex justify-center">
            <button onClick={authCtx.logout} className="absolute bottom-32">Logout</button>
          </div>
        </nav>
    </Fragment>
  );
};

export default Header;
