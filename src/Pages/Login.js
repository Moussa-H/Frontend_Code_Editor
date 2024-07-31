import React from "react";
import { useState } from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { setName, setToken, setUserRole } from "../Functions/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  console.log(emailValue);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(passwordValue);

  const fetchUser = async (email, password) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        email,
        password,
      });
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetchUser(emailValue, passwordValue);
    console.log(data);

    setToken(data.authorisation.token);
    setName(data.name);
    setUserRole(data.user_role);
    if (data.user_role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="login-content">
          <form action="" className="login-form">
            <h2 className="form-title">Login to your account</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Your Email"
                onChange={handleEmail}
                value={emailValue}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                onChange={handlePassword}
                value={passwordValue}
              />
            </div>
            <div className="form-group">
              <button className="form-submit" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
          <p className="loginhere">
            Don t have an account?{" "}
            <Link to="/Register" className="Signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
