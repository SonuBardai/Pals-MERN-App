import { Link } from "react-router-dom";

const PostContent = ({ content, tags, image }) => {
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
            {image && (
                <img
                    src={`data:image/png;base64,${image}`}
                    className="postImage"
                />
            )}
        </>
    );
};

export default PostContent;
