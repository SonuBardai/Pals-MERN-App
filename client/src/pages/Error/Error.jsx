import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./error.css";

const Error = () => {
	return (
		<>
			<div>
				<Navbar />
				<div className="message">
					<h1 className="error">Page Not Found</h1>
					<Link to={"/"}>Go Back to Home</Link>
				</div>
			</div>
		</>
	);
};

export default Error;
