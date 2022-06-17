import "./banner.css";
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import axios from "../../axios";
import { refreshAccessToken } from "../../utils";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";

const Banner = ({ myProfile, updateProfile, user }) => {
    const [description, setDescription] = useState(user.description);
    const [image, setImage] = useState(user.profilePic);
    const [cover, setCover] = useState(user.coverPic);

    useEffect(() => {
        setDescription(user.description);
        setImage(user.profilePic);
        setCover(user.coverPic);
    }, [user]);

    const showEditable = () => {
        document.getElementsByClassName("editDescription")[0].style.display =
            "block";
        document.getElementsByClassName("editProfilePicBtn")[0].style.display =
            "block";
        document.getElementsByClassName("updateCoverBtn")[0].style.display =
            "block";

        document.getElementsByClassName("updateBtn")[0].style.display = "none";
        document.getElementsByClassName("description")[0].style.display =
            "none";
    };

    const hideEditable = () => {
        document.getElementsByClassName("editDescription")[0].style.display =
            "none";
        document.getElementsByClassName("editProfilePicBtn")[0].style.display =
            "none";
        document.getElementsByClassName("updateCoverBtn")[0].style.display =
            "none";

        document.getElementsByClassName("updateBtn")[0].style.display = "block";
        document.getElementsByClassName("description")[0].style.display =
            "block";
    };

    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            let binString = event.target.result;
            setImage(btoa(binString));
        };
        reader.readAsBinaryString(file);
    };

    const getBase64Cover = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            let binString = event.target.result;
            setCover(btoa(binString));
        };
        reader.readAsBinaryString(file);
    };

    const { user: curUser, setAlert, setUser, isLoggedIn } = useGlobalContext();

    const followUser = (action) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }
        axios
            .put(
                "/users/users/follow",
                {
                    follower: curUser._id,
                    followed: user._id,
                    action,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((res) => {
                if (action === "follow") {
                    user.followers.push(curUser._id);
                    curUser.following.push(user._id);
                } else {
                    const newFollowers = user.followers.filter(
                        (follower) => follower !== curUser._id
                    );
                    user.followers = newFollowers;

                    const newFollowing = curUser.following.filter(
                        (following) => following !== user._id
                    );
                    curUser.following = newFollowing;
                }
                setUser(curUser);
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    refreshAccessToken(() => followUser(action), setAlert);
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <>
            <div className="hero">
                <label
                    className="btn updateCoverBtn"
                    style={{
                        display: "none",
                        position: "absolute",
                        marginTop: "24px",
                        marginLeft: "24px",
                        background: "white",
                        color: "#101d42",
                        border: "2px solid #101d42",
                    }}
                >
                    <BiPencil />
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => getBase64Cover(e.target.files[0])}
                    />
                </label>
                <img
                    src={
                        cover
                            ? `data:image/png;base64,${cover}`
                            : "/defaultCover.jpg"
                    }
                    alt="banner"
                    className="banner"
                />
                <div className="profile">
                    <div>
                        <label
                            className="editProfilePicBtn"
                            style={{ display: "none", cursor: "pointer" }}
                        >
                            <BiPencil className="editProfilePicBtnIcon" />
                            <input
                                type="file"
                                style={{ display: "none" }}
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => {
                                    getBase64(e.target.files[0]);
                                }}
                            />
                        </label>
                        <img
                            src={
                                image
                                    ? `data:image/png;base64,${image}`
                                    : "/default.jpg"
                            }
                            alt="ProfilePic"
                            className="profilePic"
                        />
                    </div>
                    <div className="userDetails">
                        <div className="info">
                            <div className="nameAndFollow">
                                <h2 className="username">{user.name}</h2>
                                <div className="followInfo">
                                    <div className="followItem">
                                        <span className="followNum">
                                            {user.followers.length}
                                        </span>
                                        <span className="followHead">
                                            Followers
                                        </span>
                                    </div>
                                    <div className="followItem">
                                        <span className="followNum">
                                            {user.following.length}
                                        </span>
                                        <span className="followHead">
                                            Following
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isLoggedIn &&
                                (myProfile ? (
                                    <button
                                        className="btn updateBtn"
                                        onClick={showEditable}
                                    >
                                        <BiPencil />
                                        <span>Update</span>
                                    </button>
                                ) : curUser.following.includes(user._id) ? (
                                    <button
                                        className="btn followingBtn"
                                        onClick={() => {
                                            followUser("unfollow");
                                        }}
                                    >
                                        <BsFillPersonCheckFill />
                                        <span>Following</span>
                                    </button>
                                ) : (
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            followUser("follow");
                                        }}
                                    >
                                        <BsFillPersonPlusFill />
                                        <span>Follow</span>
                                    </button>
                                ))}
                        </div>
                        <div>
                            <div className="description">{description}</div>
                            <div
                                className="editDescription"
                                style={{ display: "none" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px",
                                    }}
                                >
                                    <textarea
                                        className="editDescText"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        style={{ width: "500px" }}
                                    ></textarea>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            updateProfile({
                                                description,
                                                image,
                                                cover,
                                            });
                                            hideEditable();
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ background: "#b90f0f" }}
                                        onClick={() => {
                                            setDescription(user.description);
                                            setImage(user.profilePic);
                                            setCover(user.coverPic);
                                            hideEditable();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
