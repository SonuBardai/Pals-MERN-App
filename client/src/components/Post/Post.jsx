import Comments from "./Comments";
import "./post.css";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostInteract from "./PostInteract";

const Post = () => {
	return (
		<>
			<div className="postContainer">
				<PostHeader />
				<PostContent />
				<PostInteract />
				<Comments />
			</div>
		</>
	);
};

export default Post;
