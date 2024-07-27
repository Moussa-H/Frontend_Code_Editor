import React, { useState } from "react";
import "../Styles/Auth.css";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header />
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <form onSubmit={handleSubmit} className="signup-form">
              <h2 className="form-title">Create account</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Your FullName"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <button type="submit" name="submit" className="form-submit">
                  Sign up
                </button>
              </div>
            </form>
            <p className="loginhere">
              Have already an account?{" "}
              <Link to="/login" className="loginhere-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
