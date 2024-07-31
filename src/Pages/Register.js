import React, { useState } from "react";
import "../Styles/Auth.css";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
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

  const fetchUser = async (form) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/register', form);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchUser(formData);
      console.log(data);
      if(data.status === 'success'){
        navigate('/login')
      }
        else {
          console.log("signup failed");
        }
    
    } catch (error) {
      console.error( error);
    }

    
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
                  name="name"
                  value={formData.name}
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
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
