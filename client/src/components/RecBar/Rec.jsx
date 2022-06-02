import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";

const Rec = () => {
	return (
		<>
			<div className="recContainer">
				<img
					src="https://images.unsplash.com/photo-1533931993121-c6668a1c6bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=80"
					className="recProfilePic"
				/>
				<div className="postUsername">John Doe</div>
				<button className="btn">
					<BsFillPersonPlusFill />
					<span>Follow</span>
				</button>
			</div>
		</>
	);
};

export default Rec;
