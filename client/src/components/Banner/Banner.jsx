import "./banner.css";
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";

const Banner = () => {
	return (
		<>
			<div className="hero">
				<img
					src="https://images.unsplash.com/photo-1636476144162-c8bf391778b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
					alt="banner"
					className="banner"
				/>
				<div className="profile">
					<img
						src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
						alt="ProfilePic"
						className="profilePic"
					/>
					<div className="userDetails">
						<div className="info">
							<div className="nameAndFollow">
								<h2 className="username">John Doe</h2>
								<div className="followInfo">
									<div className="followItem">
										<span className="followNum">1.3K</span>
										<span className="followHead">
											Followers
										</span>
									</div>
									<div className="followItem">
										<span className="followNum">200</span>
										<span className="followHead">
											Following
										</span>
									</div>
								</div>
							</div>
							<button className="btn">
								<BsFillPersonPlusFill />
								<span>Follow</span>
							</button>
						</div>
						<div className="description">
							Description Lorem ipsum dolor sit, amet consectetur
							adipisicing elit. Nulla consectetur nisi sequi sint
							nobis autem facilis architecto. Deserunt dolorum
							eius fugit laborum odio in pariatur id quam, sit
							recusandae possimus!
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
