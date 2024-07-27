import React from "react";
import "./../Styles/Header.css";
import imglogo from "../Images/logo.png";
import { useState, useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  const name = "John Doe";
  const firstLetter = name.charAt(0).toUpperCase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={imglogo} />
        <span className="logo-sub-title-wrapper">
          <span className="logo-sub-title">Python Online Compiler</span>
        </span>
      </div>
      <nav className="menu">
        <a href="#developers">Code Editor</a>
        <a href="#developers">Developers</a>
      </nav>

      <div className="profile">
        {isAuthenticated ? (
          <>
            <div className="profile-image">{firstLetter}</div>
            <span className="profile-name">{name}</span>
          </>
        ) : (
          <Link to="login">
            <CiLogin />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
