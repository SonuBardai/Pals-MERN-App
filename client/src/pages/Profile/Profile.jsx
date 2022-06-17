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
import Loading from "../../components/Loading/Loading";

const Profile = () => {
    const [currUser, setCurrUser] = useState(null);
    const { setUser } = useGlobalContext();
    const [myProfile, setMyProfile] = useState(false);

    let { id } = useParams();

    const fetchProfileData = () => {
        axios
            .get(`/users/${id}`)
            .then((res) => {
                setCurrUser(res.data);
            })
            .catch((err) => console.log(err));
    };

    let user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchProfileData();

        if (user?._id === id) {
            setMyProfile(true);
        } else {
            setMyProfile(false);
        }
    }, [id]);

    const { setAlert, alert, alertCategory } = useGlobalContext();

    const updateProfile = ({ description, image, cover }) => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }

        axios
            .put(
                `/users/${user._id}`,
                { description, image, cover },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            .then((res) => {
                setAlert(res.data.message);
                user.profilePic = image;
                user.coverPic = cover;
                user.description = description;
                setUser(user);
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    refreshAccessToken(() => {
                        updateProfile({ description, image });
                    }, setAlert);
                } else {
                    console.log(err);
                }
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
                                {!myProfile && (
                                    <RecBar
                                        currUser={user}
                                        profileOf={currUser}
                                    />
                                )}
                            </div>
                            <Posts user={currUser} />
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default Profile;
