import React from "react";
import '../Styles/Auth.css'

const Login = ()=>{
    return(
        <div className="container">
            <div className="login-content">
                <form action="" className="login-form">
                    <h2 className="form-title">Login to your account</h2>
                    <div className="form-group">
                        <input type="text"
                        className="form-input"
                        placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <input type="text"
                        className="form-input"
                        placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button className="form-submit">
                            Login
                        </button>
                    </div>
                </form>
                <p className="loginhere">
                    Don t have an account?{""}
                    <a href="#" className="Signup-link">
                        Sign up here
                    </a>
                </p>

            </div>

        </div>
    )
}

export default Login