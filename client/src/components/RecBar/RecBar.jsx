import { useGlobalContext } from "../../context";
import Rec from "./Rec";
import "./recbar.css";

const RecBar = ({ currUser, profileOf }) => {
    const { allUsers } = useGlobalContext();
    const recUsers = allUsers.filter((user) => {
        return user._id !== currUser._id && user._id !== profileOf._id;
    });

    return (
        <>
            <div className="recBarContainer">
                <div className="recLabel">People You May Know: </div>
                <div className="recUsers">
                    {recUsers.map((user) => (
                        <Rec key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default RecBar;
