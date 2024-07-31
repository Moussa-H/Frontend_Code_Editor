import React from "react";
import { useState } from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authLocal } from "../source/local/auth_local";

export default function Login() {
  const navigate = useNavigate()
  const [emailValue, setEmail] = useState('')
  const [passwordValue, setPassword] = useState('')

  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  console.log(emailValue)

  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  console.log(passwordValue)
  
  const fetchUser = async (email, password)=>{
    try{
      const {data} = await axios.post('http://127.0.0.1:8000/api/login',{
        email,
        password
      })
      console.log(data)
      return data
    }catch(error){
      console.log(error)
    }
  }
  const handleLogin =  async (e)=>{
    e.preventDefault();
    const data = await fetchUser(emailValue, passwordValue)
    console.log(data)
    if(data.status === 'success'){
      authLocal.setToken(data.authorisation.token)
      if(data.user_role === 'admin'){
        navigate("/admin");
      }else{
        navigate("/")
      }
         
    } else {
      console.log("Login failed");
    }

  }
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
                type="text"
                className="form-input"
                placeholder="Password"
                onChange={handlePassword}
                value={passwordValue}
              />
            </div>
            <div className="form-group">
              <button className="form-submit" onClick={handleLogin}>Login</button>
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
