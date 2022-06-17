import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const Rec = ({ user }) => {
    return (
        <>
            <Link to={`/users/${user._id}`}>
                <div className="recContainer">
                    <img
                        src={`data:image/png;base64,${user.profilePic}`}
                        className="recProfilePic"
                    />
                    <div className="postUsername">{user.name}</div>
                    <button
                        className="btn"
                        onClick={() => {
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }}
                    >
                        <span>
                            <BiUser style={{marginRight: "5px"}} />
                            Profile
                        </span>
                    </button>
                </div>
            </Link>
        </>
    );
};

export default Rec;
