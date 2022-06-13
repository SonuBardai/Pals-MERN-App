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

const PostInteract = ({ postId, likes, comments }) => {
    const [comment, setComment] = useState("");
    const { user } = useGlobalContext();
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
                })
            )
            .catch((err) =>
                refreshAccessToken(() => submitReply(reply), setAlert)
            );
        setComment("");
    };

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
