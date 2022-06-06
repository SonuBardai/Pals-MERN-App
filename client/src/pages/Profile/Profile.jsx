import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Posts from "../../components/Posts/Posts";
import Filter from "../../components/Filter/Filter";
import RecBar from "../../components/RecBar/RecBar";

const Profile = () => {
    return (
        <>
            <div>
                <Navbar />
                <Banner />
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

export default Profile;
