import { useGlobalContext } from "../../context";
import Post from "../Post/Post";
import "./posts.css";

const Posts = ({ tag, user }) => {
    const { posts } = useGlobalContext();

    return (
        <div className="postsContainer">
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    );
};

export default Posts;
