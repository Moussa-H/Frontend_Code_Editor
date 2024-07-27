import React from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
export default function Login() {
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
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button className="form-submit">Login</button>
            </div>
          </form>
          <p className="loginhere">
            Don t have an account?{""}
            <Link to="/Register" className="Signup-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
