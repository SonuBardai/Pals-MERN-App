import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
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
						<Link to="/">Explore</Link>
					</li>
					<li
						className={
							active === "bookmarks"
								? "navLinks active"
								: "navLinks"
						}
					>
						<Link to="/">Bookmarks</Link>
					</li>
				</ul>
				<img
					src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
					alt="ProfilePic"
					className="profilePicture"
				/>
			</nav>
		</>
	);
};

export default Navbar;
