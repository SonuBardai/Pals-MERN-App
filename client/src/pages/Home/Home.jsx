import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Posts from "../../components/Posts/Posts";
import Filter from "../../components/Filter/Filter";
import Alert from "../../components/Alert/Alert";
import RecBar from "../../components/RecBar/RecBar";

import "./home.css";

import { useGlobalContext } from "../../context";
import Hero from "../../components/Hero/Hero";

const Home = () => {
    const { alert, alertCategory } = useGlobalContext();
    return (
        <>
            <div>
                <Navbar active="home" />
                {alert && <Alert alert={alert} category={alertCategory} />}
                <Hero />
                <div className="content">
                    <div className="sideBarContainer">
                        <Filter />
                        <RecBar />
                    </div>
                    <Posts />
                </div>
            </div>
        </>
    );
};

export default Home;
