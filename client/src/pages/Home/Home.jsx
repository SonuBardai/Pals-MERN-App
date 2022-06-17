import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/Posts/Posts";
import HomeFilter from "../../components/Filter/HomeFilter";
import Alert from "../../components/Alert/Alert";
import Loading from "../../components/Loading/Loading";

import "./home.css";

import { useGlobalContext } from "../../context";
import Hero from "../../components/Hero/Hero";
import UploadPost from "../../components/UploadPost/UploadPost";
import axios from "../../axios";
import { useEffect } from "react";

const Home = () => {
    const {
        alert,
        alertCategory,
        isLoggedIn,
        isLoading,
        setAllPosts,
        setPosts,
    } = useGlobalContext();

    useEffect(() => {
        axios
            .get("/posts")
            .then((res) => {
                setAllPosts(res.data);
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div>
                <Navbar active="home" />
                {alert && <Alert alert={alert} category={alertCategory} />}

                {isLoading ? (
                    <Loading />
                ) : isLoggedIn ? (
                    <UploadPost />
                ) : (
                    <Hero />
                )}
                <div className="content">
                    <div className="sideBarContainer">
                        <HomeFilter />
                    </div>
                    <Posts />
                </div>
            </div>
        </>
    );
};

export default Home;
