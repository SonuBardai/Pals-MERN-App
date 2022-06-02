import "./navbar.css";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

const Navbar = ({ active }) => {
	const isLoggedIn = false;
	return (
		<>
			<nav className="navbar">
				<h1 className="logo">pals</h1>
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
				{isLoggedIn ? (
					<img
						src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
						alt="ProfilePic"
						className="profilePicture"
					/>
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
