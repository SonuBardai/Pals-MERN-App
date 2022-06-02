import Rec from "./Rec";
import "./recbar.css";

const RecBar = () => {
	return (
		<>
			<div className="recBarContainer">
				<div className="recLabel">Recommended People: </div>
				<Rec />
				<Rec />
				<Rec />
			</div>
		</>
	);
};

export default RecBar;
