import Post from "../Post/Post";
import "./posts.css";

const Posts = () => {
	return (
		<>
			<div className="postsContainer">
				<Post />
				<Post />
				<Post />
			</div>
		</>
	);
};

export default Posts;
