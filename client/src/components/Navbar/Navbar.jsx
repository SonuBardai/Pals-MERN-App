import "./navbar.css";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

const Navbar = ({ active }) => {
	const isLoggedIn = false;
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
