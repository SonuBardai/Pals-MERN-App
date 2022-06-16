import { useGlobalContext } from "../../context";
import Post from "../Post/Post";
import "./posts.css";
import { useEffect } from "react";
import axios from "../../axios";

const Posts = ({ tag, user }) => {
    const { setPosts, posts } = useGlobalContext();

    const getAndFilterPosts = () => {
        axios
            .get("/posts")
            .then((res) => {
                let initPosts = res.data;

                if (tag) {
                    const newPosts = initPosts.filter((post) => {
                        return post.tags.includes(`#${tag}`);
                    });
                    initPosts = newPosts;
                }

                if (user) {
                    const newPosts = initPosts.filter(
                        (post) => post.user._id === user._id
                    );
                    initPosts = newPosts;
                }

                setPosts(initPosts);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAndFilterPosts();
    }, [user]);

    return (
        <div className="postsContainer">
            {posts.map((post) => (
                <Post post={post} key={post._id} />
            ))}
        </div>
    );
};

export default Posts;
