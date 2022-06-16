import "./search.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ allUsers }) => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let results = allUsers.filter((user) =>
            user.name.toLowerCase().includes(search)
        );
        setUsers(results);
        console.log("searchbar useeffect", search, results, allUsers);
    }, [search]);

    console.log("rendered search component");

    return (
        <>
            <div className="searchContainer">
                <div className="searchBarContainer">
                    <input
                        type="text"
                        className="searchField"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="searchBtn">
                        <AiOutlineSearch className="searchBtnIcon" />
                    </button>
                </div>

                {search && (
                    <div className="searchedUsers">
                        {users &&
                            users.map((user) => (
                                <Link to={`/users/${user._id}`}>
                                    <SearchUser user={user} key={user._id} />
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;

const SearchUser = ({ user }) => {
    return (
        <div className="userInSearch">
            <img
                src={`data:image/png;base64,${user.profilePic}`}
                className="recProfilePic"
                style={{ borderRadius: "4px" }}
            />
            <div className="postUsername">{user.name}</div>
        </div>
    );
};
