import { Link } from "react-router-dom";

const PostContent = ({ content, tags }) => {
    return (
        <>
            <div className="postText">{content}</div>
            <div className="postTags">
                {tags &&
                    tags.map((tag) => (
                        <span key={tag}>
                            <Link to={`/tags/${tag.substring(1)}`}>{tag}</Link>
                        </span>
                    ))}
            </div>
            {/* <img
				src="https://images.unsplash.com/photo-1645134159513-f784a817346e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
				className="postImage"
			/> */}
        </>
    );
};

export default PostContent;
