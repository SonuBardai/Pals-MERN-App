import "./postInteract.css";
import { FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillSaveFill } from "react-icons/bs";
import {
    AiOutlineRetweet,
    AiOutlineSend,
    AiOutlineHeart,
} from "react-icons/ai";
import { useState } from "react";

import axios from "../../axios";
import { useGlobalContext } from "../../context";
import { refreshAccessToken } from "../../utils";
import { Link } from "react-router-dom";

const PostInteract = ({ postId, likes, comments }) => {
    const [comment, setComment] = useState("");
    const { user, likePostReducer, setUser } = useGlobalContext();
    const { setAlert, addComment } = useGlobalContext();

    const submitReply = (reply) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }
        axios
            .post(
                "/posts/comment",
                {
                    postId,
                    comment: reply.comment,
                    user: reply.user.id,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((res) =>
                addComment({
                    postId,
                    comment: reply.comment,
                    commentor: reply.user,
                    commentDate: new Date(),
                })
            )
            .catch((err) => {
                if (err.response?.status === 403) {
                    refreshAccessToken(() => submitReply(reply), setAlert);
                } else {
                    console.log(err);
                }
            });
        setComment("");
    };

    const likePost = (userId, action) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }

        axios
            .post(
                `/posts/${postId}/like`,
                {
                    userId,
                    action,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((res) => {
                likePostReducer({ postId, userId, myAction: action });
                if (action === "like") {
                    user.likedPosts.push(postId);
                } else {
                    const newLikedPosts = user.likedPosts.filter(
                        (post) => post !== postId
                    );
                    user.likedPosts = newLikedPosts;
                }
                setUser(user);
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    refreshAccessToken(() => likePost(userId), setAlert);
                } else {
                    console.log(err);
                }
            });
    };

    const isLiked = user.likedPosts.includes(postId);

    return (
        <>
            <div className="postInteractContainer">
                <div className="interactInfo">
                    <span className="interactItem">{likes} Likes</span>
                    <span className="interactItem">
                        {comments ? comments.length : 0} Comments
                    </span>
                    <span className="interactItem">3 Saved</span>
                    <span className="interactItem">5 Reposts</span>
                </div>
                <div className="interactBtnGroup">
                    {isLiked ? (
                        <button
                            className="interactBtn"
                            onClick={() => {
                                likePost(user.id, "dislike");
                            }}
                        >
                            <FcLike />
                            <span>Liked</span>
                        </button>
                    ) : (
                        <button
                            className="interactBtn"
                            onClick={() => {
                                likePost(user.id, "like");
                            }}
                        >
                            <AiOutlineHeart />
                            <span>Like</span>
                        </button>
                    )}
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
                    <Link to={`/users/${user._id}`}>
                        <img
                            src={
                                user.profilePic
                                    ? `data:image/png;base64,${user.profilePic}`
                                    : "/default.jpg"
                            }
                            className="postCommentPic"
                        />
                    </Link>
                    <input
                        type="text"
                        className="commentField"
                        placeholder="Reply to the Post..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <AiOutlineSend
                        className="commentSend"
                        onClick={(e) => {
                            e.preventDefault();
                            submitReply({ comment, user });
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default PostInteract;
