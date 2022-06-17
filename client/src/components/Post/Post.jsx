import { useGlobalContext } from "../../context";
import Comments from "./Comments";
import "./post.css";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostInteract from "./PostInteract";

const Post = ({ post }) => {
    const { isLoggedIn } = useGlobalContext();

    return (
        <>
            <div className="postContainer">
                <PostHeader user={post.user} date={new Date(post.postDate)} />
                <PostContent
                    content={post.content}
                    tags={post.tags}
                    image={post.image}
                />
                {isLoggedIn && (
                    <PostInteract
                        postId={post._id}
                        likes={post.likes}
                        comments={post.comments}
                    />
                )}
                {post.comments && <Comments comments={post.comments} />}
            </div>
        </>
    );
};

export default Post;
