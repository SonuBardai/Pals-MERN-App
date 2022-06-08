import "./comment.css";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

const Comment = ({ comment }) => {
    return (
        <>
            <div className="commentContainer">
                <img
                    src="https://images.unsplash.com/photo-1533931993121-c6668a1c6bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=80"
                    className="postCommentPic"
                />
                <div className="commentorHead">
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        <div className="postUsername">
                            {comment.commentor.name}
                        </div>
                        <div className="postDate">29 Aug 2022</div>
                    </div>
                    <div className="commentText">{comment.comment}</div>
                </div>
                {/* <div className="commentInteract">
                    <button className="interactBtn">
                        <AiOutlineHeart />
                        <span>Like</span>
                    </button>
                    <span className="commentLikeCount">18 Likes</span>
                </div> */}
            </div>
        </>
    );
};

export default Comment;
