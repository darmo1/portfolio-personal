import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/img/atomo.svg";
import Colombia from "../components/img/colombia.svg";
import electricity from "../components/img/electricista.svg";
import soldador from "../components/img/soldador.svg";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-logo">
        <div className="Logo">
          <Link to="/">
            <img className="Logo-img" src={Logo} alt="Logo-Science Material" />
          </Link>
        </div>
      </div>

      <div className="text-home">
          <p>
            <img
              className="img-header"
              src={electricity}
              alt="icon-ingeniero"
            />
            Una web de ingenieros de materiales para el mundo{" "}
            <img className="img-header" src={soldador} alt="icon-ingeniero" />{" "}
          </p>
        </div>

      <div className="Nav">
        <ul className="Nav-unorderList">
          <Link to={"/"}>
            <li className="item">Home</li>
          </Link>
          <Link to={"/blog"}>
            <li className="item">Blog</li>
          </Link>
          <Link to={"/about-us"}>
            <li className="item">About Us</li>
          </Link>
          <li className="item">
            Made in{" "}
            <span>
              <img
                className="colombia-flag"
                src={Colombia}
                alt="Made in Colombia"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
