import React from "react";
import "../index.css";
import logo from "../images/aroundtheus.svg";
import { useLocation, NavLink } from "react-router-dom";


function Header({ loggedIn, ...props }) {
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
      <div className="header__auth-wrapper">
      <span className="header__auth-email"  >{loggedIn ? props.email : ''}</span>
      <NavLink className={`header__auth ${!loggedIn ? "header__auth_active" : ""}`} to={ sendTo ? '/signin' : '/register' }>{logOrRegister}</NavLink>
      </div>
    </header>
  );
}

export default Header;
