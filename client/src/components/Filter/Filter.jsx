import { useEffect } from "react";
import { useGlobalContext } from "../../context";
import "./filter.css";

const Filter = () => {
    const { posts, profileFilter, setProfileFilter, allPosts, setPosts, user } =
        useGlobalContext();

    useEffect(() => {
        filterPostsBy("posts");
    }, []);

    const filterPostsBy = (filter) => {
        switch (filter) {
            case "posts":
                const userPosts = allPosts.filter(
                    (post) => post.user._id === user._id
                );
                setPosts(userPosts);
                setProfileFilter("posts");
                break;
            case "replies":
                const replyPosts = allPosts
                    .map((post) => {
                        for (let i = 0; i < post.comments.length; i++) {
                            if (post.comments[i].commentor._id === user._id) {
                                return post;
                            }
                        }
                    })
                    .filter((post) => post !== undefined);
                setPosts(replyPosts);
                setProfileFilter("replies");
                break;
            case "media":
                const newPosts = posts.filter(
                    (post) => post.image && post.user._id === user._id
                );
                setPosts(newPosts);
                setProfileFilter("media");
                break;
            case "likes":
                const likedPosts = allPosts.filter((post) =>
                    user.likedPosts.includes(post._id)
                );
                setPosts(likedPosts);
                setProfileFilter("likes");
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="filterContent">
                <div
                    className={
                        profileFilter === "posts"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("posts")}
                >
                    Posts
                </div>
                <div
                    className={
                        profileFilter === "replies"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("replies")}
                >
                    Replies
                </div>
                <div
                    className={
                        profileFilter === "media"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("media")}
                >
                    Media
                </div>
                <div
                    className={
                        profileFilter === "likes"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("likes")}
                >
                    Likes
                </div>
            </div>
        </>
    );
};

export default Filter;
