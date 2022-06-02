import "./filter.css";

const Filter = () => {
	return (
		<>
			<div className="filterContent">
				<div className="filterItem activeFilter">Posts</div>
				<div className="filterItem">Replies</div>
				<div className="filterItem">Media</div>
				<div className="filterItem">Likes</div>
			</div>
		</>
	);
};

export default Filter;
