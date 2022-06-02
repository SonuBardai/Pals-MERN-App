import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
	return (
		<>
			<div>
				<Navbar active={"register"} />
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
								<input type="text" placeholder="Username" />
							</div>
							<div className="input-group">
								<input type="text" placeholder="Email" />
							</div>
							<div className="input-group">
								<input type="password" placeholder="Password" />
							</div>
							<div className="input-group">
								<input
									type="password"
									placeholder="Password-Confirmation"
								/>
							</div>
							<div className="input-group">
								<input type="button" value="Register" />
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
