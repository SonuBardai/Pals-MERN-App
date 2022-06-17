import { useGlobalContext } from "../../context";
import "./filter.css";
import axios from "../../axios";

const HomeFilter = () => {
    const { setPosts, allPosts, user, setHomeFilter, homeFilter } =
        useGlobalContext();

    const filterPostsBy = (filter) => {
        switch (filter) {
            case "latest":
                setPosts(allPosts);
                setHomeFilter("latest");
                break;

            case "popular":
                axios
                    .get("/posts/posts/popular")
                    .then((res) => setPosts(res.data))
                    .catch((err) => console.log(err));
                setHomeFilter("popular");
                break;

            case "following":
                const followingPosts = allPosts.filter((post) =>
                    user.following.includes(post.user._id)
                );
                setPosts(followingPosts);
                setHomeFilter("following");
                break;

            case "followers":
                const followersPosts = allPosts.filter((post) =>
                    user.followers.includes(post.user._id)
                );
                setPosts(followersPosts);
                setHomeFilter("followers");
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
                        homeFilter === "latest"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("latest")}
                >
                    Latest
                </div>
                <div
                    className={
                        homeFilter === "popular"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("popular")}
                >
                    Popular
                </div>
                <div
                    className={
                        homeFilter === "following"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("following")}
                >
                    Following
                </div>
                <div
                    className={
                        homeFilter === "followers"
                            ? "filterItem activeFilter"
                            : "filterItem"
                    }
                    onClick={() => filterPostsBy("followers")}
                >
                    Followers
                </div>
            </div>
        </>
    );
};

export default HomeFilter;
