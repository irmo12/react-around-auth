import React from "react";
import "../index.css";
import logo from "../images/aroundtheus.svg";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="around the u.s." />
      <p className={`header__auth ${loggedIn ? '' : 'header__auth_active'}`}>Log in</p>
    </header>
  );
}

export default Header;
