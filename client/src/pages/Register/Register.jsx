import Navbar from "../../components/Navbar/Navbar";
import Alert from "../../components/Alert/Alert";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../axios";

import { useGlobalContext } from "../../context";

import "./register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const navigator = useNavigate();

    const { setAlert, alert, alertCategory } = useGlobalContext();

    const registerUser = (name, email, password1, password2) => {
        if (name && email && password1 && password2) {
            //  Email Validation
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                return setAlert(
                    "Please enter a valid email address",
                    "alertDanger"
                );
            }
            if (password1 !== password2) {
                return setAlert("Passwords must match", "alertInfo");
            } else {
                axios
                    .post("/auth/register", {
                        name,
                        email,
                        password: password1,
                    })
                    .then((response) => {
                        response = response.data;
                        navigator("/login");
                        return setAlert("User Registered", "alertSuccess");
                    })
                    .catch((error) => {
                        return setAlert(
                            error.response.data.message,
                            "alertDanger"
                        );
                    });
            }
        } else {
            return setAlert("Please enter all fields", "alertInfo");
        }
    };

    return (
        <>
            <div>
                <Navbar active={"register"} />
                {alert && <Alert alert={alert} category={alertCategory} />}
                <div className="registerContainer">
                    <img
                        src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        className="loginBanner"
                    />
                    <div className="loginFormContainer">
                        <h1 className="loginHead">
                            Join your <span className="loginLogo">pals</span>
                        </h1>
                        <div className="loginForm">
                            <h2>Start Here!</h2>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password1}
                                    onChange={(e) =>
                                        setPassword1(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Password-Confirmation"
                                    value={password2}
                                    onChange={(e) =>
                                        setPassword2(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="button"
                                    value="Register"
                                    onClick={() =>
                                        registerUser(
                                            name,
                                            email,
                                            password1,
                                            password2
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="registerLinkContainer">
                            <span>
                                Already have an account?{" "}
                                <Link to={"/login"}>Login Here</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
