import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/Posts/Posts";

import { useParams } from "react-router-dom";
import "./filteredposts.css";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";

const FilteredPosts = () => {
    const { tag } = useParams();
    const { setPosts, allPosts } = useGlobalContext();

    useEffect(() => {
        const newPosts = allPosts.filter((post) => {
            return post.tags.includes(`#${tag}`);
        });
        setPosts(newPosts);
    }, [tag]);

    return (
        <>
            <div>
                <Navbar />
                <div className="tagsFilteredBy">
                    Posts filtered by <span>#{tag}</span>
                </div>
                <div
                    className="fullPosts"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Posts />
                </div>
            </div>
        </>
    );
};

export default FilteredPosts;
