import "./postInteract.css";
import { FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillSaveFill } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineSend, AiOutlineHeart } from "react-icons/ai";

const PostInteract = () => {
	return (
		<>
			<div className="postInteractContainer">
				<div className="interactInfo">
					<span className="interactItem">28 Likes</span>
					<span className="interactItem">8 Comments</span>
					<span className="interactItem">3 Saved</span>
					<span className="interactItem">5 Reposts</span>
				</div>
				<div className="interactBtnGroup">
					<button className="interactBtn">
						<AiOutlineHeart />
						<span>Like</span>
					</button>
					<button className="interactBtn">
						<BiCommentDetail />
						<span>Comment</span>
					</button>
					<button className="interactBtn">
						<BsFillSaveFill />
						<span>Save</span>
					</button>
					<button className="interactBtn">
						<AiOutlineRetweet />
						<span>Repost</span>
					</button>
				</div>
				<div className="postComment">
					<img
						src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
						className="postCommentPic"
					/>
					<input
						type="text"
						className="commentField"
						placeholder="Reply to the Post..."
					/>
					<AiOutlineSend className="commentSend" />
				</div>
			</div>
		</>
	);
};

export default PostInteract;
