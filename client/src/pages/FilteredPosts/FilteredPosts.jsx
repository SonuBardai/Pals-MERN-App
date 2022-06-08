import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/Posts/Posts";

import { useParams } from "react-router-dom";
import "./filteredposts.css";

const FilteredPosts = () => {
    const { tag } = useParams();

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
                    <Posts tag={tag} />
                </div>
            </div>
        </>
    );
};

export default FilteredPosts;
