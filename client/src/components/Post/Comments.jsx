import Comment from "./Comment";

const Comments = ({ comments }) => {
    return (
        <>
            <div className="commentsContainer">
                {comments.length > 0 && (
                    <div
                        style={{
                            marginBottom: "8px",
                            fontWeight: "700",
                            textDecoration: "underline",
                        }}
                    >
                        Comments:{" "}
                    </div>
                )}
                {comments.map((comment) => (
                    <Comment comment={comment} key={comment.comment} />
                ))}
            </div>
        </>
    );
};

export default Comments;
