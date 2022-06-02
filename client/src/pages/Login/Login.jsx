import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
	return (
		<>
			<Navbar active={"login"} />
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
							<input type="text" placeholder="Email" />
						</div>
						<div className="input-group">
							<input type="password" placeholder="Password" />
						</div>
						<div className="input-group">
							<input type="button" value="Login" />
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
