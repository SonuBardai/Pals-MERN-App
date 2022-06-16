import "./navbar.css";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";
import axios from "../../axios";
import Search from "../Search/Search";
import { useState } from "react";

const Navbar = ({ active }) => {
    const { alert, setAlert, isLoggedIn, user, setLogout } = useGlobalContext();

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
            })
            .catch((err) => console.log(err));
    }, []);

    console.log("rendered navbar");

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
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABOElEQVRIie3UsStFYRjH8c8Vwx0YLBYjZVWKyd9gQCFZzGySgcVKsiDhz5BN7MpMiUXKgJIB9xjOe3Jyzj3XvZdB+dXpnJ73eb+/8zzneQ//+mvqww6ucYMD9OfklTD0NRg1cR1jJEDXwgtEjRi8YCtU0hNgDwX5uQZpnYbYE1bRhTImMRpy2jGHS3Hb1usxGA6xZyxhH48hVgmxRC3i3ldj5QexLVv6Gd7C8y5av8OqZlASt2MTC+gN8ZFQWYRDcesaMijSIO7Cvs3fMCA+BxFu81gtORsm6jQYCPeHWomJawWL34RP+fzY0zmsjObxHhb30FYAH8er7IRVPWiJ0tNxhI4G4YXfMz0d5+hOrY2l4MtFkFrqwUUAXYmnZSYFX2kGnqgTJ7Kl/wg8URkbuBf/0GZ/Ev4vH0l1lFJgud4hAAAAAElFTkSuQmCC" />
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
