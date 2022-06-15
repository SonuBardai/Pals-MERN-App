import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Posts from "../../components/Posts/Posts";
import Filter from "../../components/Filter/Filter";
import RecBar from "../../components/RecBar/RecBar";
import Alert from "../../components/Alert/Alert";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "../../axios";
import { refreshAccessToken } from "../../utils";
import { useGlobalContext } from "../../context";

const Profile = () => {
    const [currUser, setCurrUser] = useState(null);
    const { setUser } = useGlobalContext();

    const [myProfile, setMyProfile] = useState(false);

    useEffect(() => {
        axios
            .get(`/users/${id}`)
            .then((res) => setCurrUser(res.data))
            .catch((err) => console.log(err));

        let curUser = JSON.parse(localStorage.getItem("user"));
        
        if (curUser?._id === id) {
            setMyProfile(true);
        }
    }, []);

    const { id } = useParams();

    const { setAlert, alert, alertCategory, setPosts } = useGlobalContext();

    const updateProfile = ({ description, image, cover }) => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }

        axios
            .put(
                `/users/${currUser._id}`,
                { description, image, cover },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            .then((res) => {
                setAlert(res.data.message);
                let oldUser = JSON.parse(localStorage.getItem("user"));
                oldUser.profilePic = image;
                oldUser.coverPic = cover;
                oldUser.description = description;
                localStorage.setItem("user", JSON.stringify(oldUser));
                setUser(oldUser);
            })
            .catch((err) => {
                console.error(err);
                refreshAccessToken(() => {
                    updateProfile({ description, image });
                }, setAlert);
            });
    };

    return (
        <>
            <div>
                <Navbar />
                {alert && <Alert alert={alert} category={alertCategory} />}
                {currUser ? (
                    <div>
                        <Banner
                            myProfile={myProfile}
                            updateProfile={updateProfile}
                            user={currUser}
                        />
                        <div className="content">
                            <div className="sideBarContainer">
                                <Filter />
                                <RecBar />
                            </div>
                            <Posts user={currUser} />
                        </div>
                    </div>
                ) : (
                    <div className="logo">Loading...</div>
                )}
            </div>
        </>
    );
};

export default Profile;
