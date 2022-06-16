import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/Posts/Posts";
import Filter from "../../components/Filter/Filter";
import Alert from "../../components/Alert/Alert";
import Loading from "../../components/Loading/Loading";

import "./home.css";

import { useGlobalContext } from "../../context";
import Hero from "../../components/Hero/Hero";
import UploadPost from "../../components/UploadPost/UploadPost";

const Home = () => {
    const { alert, alertCategory, isLoggedIn, isLoading } = useGlobalContext();

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
                        <Filter />
                    </div>
                    <Posts />
                </div>
            </div>
        </>
    );
};

export default Home;
