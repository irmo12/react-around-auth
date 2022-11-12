import React from "react";
import "../index.css";
import logo from "../images/aroundtheus.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="around the u.s." />
    </header>
  );
}

export default Header;
