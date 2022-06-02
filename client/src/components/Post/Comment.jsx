import "./comment.css";
import { FcLike } from "react-icons/fc";

const Comment = () => {
	return (
		<>
			<div className="commentContainer">
				<div className="commentorHead">
					<img
						src="https://images.unsplash.com/photo-1533931993121-c6668a1c6bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=80"
						className="postCommentPic"
					/>
					<div className="postUsername">Shane Boe</div>
					<div className="postDate">29 Aug 2022</div>
				</div>
				<div className="commentText">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
					quos debitis nihil. Lorem ipsum dolor sit amet consectetur
				</div>
				<div className="commentInteract">
					<button className="interactBtn">
						<FcLike />
						<span>Like</span>
					</button>
					<span className="commentLikeCount">18 Likes</span>
				</div>
			</div>
		</>
	);
};

export default Comment;
