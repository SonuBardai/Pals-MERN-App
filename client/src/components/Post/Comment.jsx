import "./comment.css";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
    const date = new Date(comment.commentDate);
    return (
        <>
            <div className="commentContainer">
                <Link to={`/users/${comment.commentor._id}`}>
                    <img
                        src={
                            comment.commentor.profilePic
                                ? `data:image/png;base64,${comment.commentor.profilePic}`
                                : "/default.jpg"
                        }
                        className="postCommentPic"
                    />
                </Link>
                <div className="commentorHead">
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >
                        <Link to={`/users/${comment.commentor._id}`}>
                            <div className="postUsername">
                                {comment.commentor.name}
                            </div>
                        </Link>
                        <div className="postDate">{`${String(
                            date.getDate()
                        ).padStart(2, "0")}-${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}-${date.getFullYear()}`}</div>
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
