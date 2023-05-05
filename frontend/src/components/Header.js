import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Header(props) {
  return (
    <header className="page__header header">
      <img
        className="header__logo logo"
        src={logo}
        alt="Логотип 'Mesto Russia'"
      />
      {props.onExit ? 
        <div className="header__nav">
          <p className="header__nav_mail">{props.userEmail}</p>
          <button className="header__nav_link" onClick={props.onExit}>
            Выйти
          </button>
        </div>
       : 
        <Link to={props.navLink} className="header__nav_link">
          {props.navLinkName}
        </Link>
      }
    </header>
  );
}

export default Header;
