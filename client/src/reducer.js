export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ALERT":
            return {
                ...state,
                alert: action.payload.message,
                alertCategory: action.payload.category,
            };

        case "CLEAR_ALERT":
            return { ...state, alert: "" };

        case "SET_USER":
            return { ...state, user: action.payload, isLoggedIn: true };

        case "ADD_TO_POSTS":
            state.posts.unshift(action.payload);
            return { ...state };

        case "SET_POSTS":
            return { ...state, posts: action.payload };

        case "ADD_COMMENT":
            let newPosts = state.posts.map((post) => {
                if (post._id === action.payload.postId) {
                    post.comments.push({
                        comment: action.payload.comment,
                        commentor: action.payload.commentor,
                    });
                }
                return post;
            });

            return { ...state, posts: newPosts };

        default:
            return state;
    }
};
