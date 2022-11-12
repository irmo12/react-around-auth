import React from "react";
import "../index.css";
import logo from "../images/aroundtheus.svg";
import { useLocation, NavLink } from "react-router-dom";


function Header({ loggedIn, type }) {
  let location = useLocation();

  let logOrRegister = 'Log in'
  let sendTo = true;
  if (location.pathname==='/signin') { 
    logOrRegister = 'Sign up'
    sendTo = false;
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="around the u.s." />
      <NavLink className={`header__auth ${loggedIn ? "header__auth_active" : ""}`} to={ sendTo ? '/signin' : '/register' }>{logOrRegister}</NavLink>
    </header>
  );
}

export default Header;
