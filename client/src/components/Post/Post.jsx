import Comments from "./Comments";
import "./post.css";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostInteract from "./PostInteract";

const Post = ({ post }) => {
    return (
        <>
            <div className="postContainer">
                <PostHeader />
                <PostContent content={post.content} tags={post.tags} />
                <PostInteract
                    postId={post._id}
                    likes={post.likes}
                    comments={post.comments}
                />
                {post.comments && <Comments comments={post.comments} />}
            </div>
        </>
    );
};

export default Post;
