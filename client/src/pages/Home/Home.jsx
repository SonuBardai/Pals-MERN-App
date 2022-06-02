import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Posts from "../../components/Posts/Posts";
import Filter from "../../components/Filter/Filter";
import "./home.css";
import RecBar from "../../components/RecBar/RecBar";

const Home = () => {
	return (
		<>
			<div>
				<Navbar active="home" />
				<Banner />
				<div className="content">
					<div className="sideBarContainer">
						<Filter />
						<RecBar />
					</div>
					<Posts />
				</div>
			</div>
		</>
	);
};

export default Home;
