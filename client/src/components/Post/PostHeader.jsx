import { Link } from "react-router-dom";

const PostHeader = ({ user, date }) => {
    return (
        <>
            <div className="postHeader">
                <Link to={`/users/${user._id}`}>
                    <img
                        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
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
