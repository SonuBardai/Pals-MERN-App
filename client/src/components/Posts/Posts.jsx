import { useGlobalContext } from "../../context";
import Post from "../Post/Post";
import "./posts.css";
import { useEffect } from "react";
import axios from "../../axios";

const Posts = ({ tag }) => {
    const { setPosts } = useGlobalContext();
    useEffect(() => {
        const getPosts = () => {
            axios
                .get("/posts")
                .then((res) => setPosts(res.data))
                .catch((err) => console.log(err));
        };
        getPosts();
    }, []);

    let { posts } = useGlobalContext();
    if (tag) {
        const newPosts = posts.filter((post) => {
            return post.tags.includes(`#${tag}`);
        });
        posts = newPosts;
    }

    return (
        <div className="postsContainer">
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    );
};

export default Posts;
