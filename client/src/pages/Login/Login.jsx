import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useGlobalContext } from "../../context";
import Alert from "../../components/Alert/Alert";
import "./login.css";
import axios from "../../axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();

    const { setAlert, alert, alertCategory, setUser } = useGlobalContext();

    const loginUser = () => {
        if (email && password) {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                return setAlert(
                    "Please enter a valid email address",
                    "alertDanger"
                );
            }

            axios
                .post("/auth/login", { email, password })
                .then((response) => {
                    localStorage.setItem(
                        "refreshToken",
                        response.data.refreshToken
                    );
                    localStorage.setItem(
                        "accessToken",
                        response.data.accessToken
                    );
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            id: response.data.id,
                            email: response.data.email,
                            name: response.data.name,
                        })
                    );
                    setUser({
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                    });
                    navigator("/");
                })
                .catch((err) => {
                    setAlert(err.response.data.message, "alertInfo");
                });
        } else {
            return setAlert("Please enter all fields", "alertInfo");
        }
    };

    return (
        <>
            <Navbar active={"login"} />
            {alert && <Alert alert={alert} category={alertCategory} />}
            <div className="loginContainer">
                <img
                    src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                    className="loginBanner"
                />
                <div className="loginFormContainer">
                    <h1 className="loginHead">
                        Meet your <span className="loginLogo">pals</span>
                    </h1>
                    <h2>Share your best moments!</h2>
                    <div className="loginForm">
                        <h2>Welcome Back</h2>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="button"
                                value="Login"
                                onClick={loginUser}
                            />
                        </div>
                    </div>
                    <div className="registerLinkContainer">
                        <span>
                            Don't have an account?{" "}
                            <Link to={"/register"}>Sign-Up Here</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
