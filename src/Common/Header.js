import React, { useState, useEffect } from "react";
import "./../Styles/Header.css";
import imglogo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { getToken, getName, setUserRole } from "../Functions/Auth";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = getToken();
    const name = getName();
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);
  const firstLetter = userName.charAt(0).toUpperCase();
  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever key you use to store the token
    localStorage.removeItem("name"); // or whatever key you use to store the user name
    setIsAuthenticated(false);
    setUserName("");
    setUserRole("");
  };
  return (
    <header className="header">
      <div className="logo">
        <img src={imglogo} alt="Logo" />
        <span className="logo-sub-title-wrapper">
          <span className="logo-sub-title">Python Online Compiler</span>
        </span>
      </div>
      <nav className="menu">
        <Link to="/">Code Playground</Link>
        <Link to="/chat">Dev Chat</Link>
        <Link to="/">Help & Support</Link>
      </nav>

      <div className="profile">
        {isAuthenticated ? (
          <>
            <div className="profile-image">{firstLetter}</div>
            <span className="profile-name">{userName}</span>
            <Link to="/Login">
              {" "}
              <IoIosLogOut onClick={handleLogout} />{" "}
            </Link>
          </>
        ) : (
          <Link to="/login">
            <FaRegCircleUser />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
