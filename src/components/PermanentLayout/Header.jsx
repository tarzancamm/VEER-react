import React, { useState, Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import VEERlogo from "../../media/VEERlogo.png";
import { GrMenu } from "react-icons/gr";
import {RxCross2} from 'react-icons/rx';
import {CgProfile} from 'react-icons/cg';
import AuthContext from "../../store/authContext";

const Header = ({openModal}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {logout} = useContext(AuthContext)
  const {token} = useContext(AuthContext)
  const {firstName} = useContext(AuthContext)

  const closeMenuHandler = () => setShowMenu(false);

  return (
    <Fragment>
        <header className="fixed top-0 left-0 h-20 w-screen z-40 border-b-2 border-solid border-red flex flex-row items-center justify-between bg-white">
            <NavLink to="/"><img src={VEERlogo} alt="veer logo" className="h-16 w-auto ml-4" /></NavLink>
            <button onClick={() => setShowMenu(!showMenu)} className='text-2xl mr-8'>
                {showMenu ? <RxCross2 /> : <GrMenu />}
            </button>
        </header>
        <nav className={showMenu ? "absolute h-screen w-64 top-20 z-40 bg-white right-0 transition-all ease-in-out duration-300 border-l-2 border-solid border-red flex flex-col gap-4" : "absolute top-20 h-screen w-64 z-40 bg-white -right-64 transition-all ease-in-out duration-300 border-l-2 border-solid border-red flex flex-col gap-4"}>
          <NavLink to="#map" onClick={closeMenuHandler} className="hover:text-red ml-8 mt-8">
            Adventures
          </NavLink>
          <button className="ml-8 flex" onClick={openModal}>
            <div className="pr-2">
                <CgProfile />
            </div>
            {token ? <NavLink to="/profile" onClick={closeMenuHandler}>{firstName}</NavLink> : <p>login / signup</p>}
          </button>
          {token && <div className="flex justify-center">
            <button onClick={logout} className="absolute bottom-32">Logout</button>
          </div>}
        </nav>
    </Fragment>
  );
};

export default Header;
