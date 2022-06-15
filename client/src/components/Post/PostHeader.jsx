import { Link } from "react-router-dom";

const PostHeader = ({ user, date }) => {
    return (
        <>
            <div className="postHeader">
                <Link to={`/users/${user._id}`}>
                    <img
                        src={
                            user.profilePic
                                ? `data:image/png;base64,${user.profilePic}`
                                : "/default.jpg"
                        }
                        alt="profilePic"
                        className="postProfilePic"
                    />
                </Link>
                <div className="postInfo">
                    <Link to={`/users/${user._id}`}>
                        <div className="postUsername">{user.name}</div>
                    </Link>
                    <div className="postDate">
                        {`${String(date.getDate()).padStart(2, "0")}-${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}-${date.getFullYear()}`}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostHeader;
