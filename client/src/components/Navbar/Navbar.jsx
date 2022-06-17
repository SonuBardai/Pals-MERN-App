import "./navbar.css";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";
import axios from "../../axios";
import Search from "../Search/Search";
import { useState } from "react";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";

const Navbar = ({ active }) => {
    const {
        alert,
        setAlert,
        isLoggedIn,
        user,
        setLogout,
        lightMode,
        setLightMode,
        setDarkMode,
        setAllUsersReducer,
    } = useGlobalContext();

    useEffect(() => {
        setTimeout(() => {
            setAlert("", "");
        }, 2500);
    }, [alert]);

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        axios
            .get("/users/")
            .then((res) => {
                setAllUsers(res.data);
                setAllUsersReducer(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (localStorage.getItem("lightMode") !== null) {
            const mode = JSON.parse(localStorage.getItem("lightMode"));
            if (mode) {
                setLightMode();
            } else {
                setDarkMode();
            }
        } else {
            localStorage.setItem("lightMode", true);
        }
    }, []);

    const dropDown = document.getElementsByClassName("navProfileOptions")[0];

    const showDropDown = () => {
        dropDown.style.display = "block";
    };

    const hideDropDown = () => {
        dropDown.style.display = "none";
    };

    const logoutUser = () => {
        axios
            .post("/auth/logout", {
                token: localStorage.getItem("refreshToken"),
                userId: user.id,
            })
            .then((res) => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setAlert("You have been logged out", "alertSuccess");

                setLogout();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <nav className="navbar">
                <Link to={"/"} className="logo">
                    <FaHandsHelping className="logoIcon" />
                    pals
                </Link>
                <ul className="navList">
                    <li
                        className={
                            active === "home" ? "navLinks active" : "navLinks"
                        }
                    >
                        <Link to="/">Home</Link>
                    </li>
                    <li
                        className={
                            active === "explore"
                                ? "navLinks active"
                                : "navLinks"
                        }
                    >
                        <Link to="/explore">Explore</Link>
                    </li>
                    <li
                        className={
                            active === "bookmarks"
                                ? "navLinks active"
                                : "navLinks"
                        }
                    >
                        <Link to="/bookmarks">Bookmarks</Link>
                    </li>
                </ul>

                <Search allUsers={allUsers} />

                {isLoggedIn ? (
                    <div>
                        <img
                            src={
                                user.profilePic
                                    ? `data:image/png;base64,${user.profilePic}`
                                    : "/default.jpg"
                            }
                            alt={user.name}
                            title={user.name}
                            className="profilePicture"
                            onClick={showDropDown}
                        />
                        <div onMouseLeave={hideDropDown}>
                            <ul className="navProfileOptions">
                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    Theme:{" "}
                                    {lightMode ? (
                                        <BsLightbulbOff onClick={setDarkMode} />
                                    ) : (
                                        <BsLightbulb onClick={setLightMode} />
                                    )}
                                </li>
                                <hr />
                                <Link to={`/users/${user.id}`}>
                                    <li>Profile</li>
                                </Link>
                                <hr />
                                <li
                                    style={{ color: "#a8090c" }}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="joinLinks">
                        <Link
                            to={"/login"}
                            element={<Login />}
                            className={
                                active === "login"
                                    ? "navLinks active"
                                    : "navLinks"
                            }
                        >
                            Login
                        </Link>
                        <Link
                            to={"/register"}
                            element={<Register />}
                            className={
                                active === "register"
                                    ? "navLinks active"
                                    : "navLinks"
                            }
                        >
                            Register
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
