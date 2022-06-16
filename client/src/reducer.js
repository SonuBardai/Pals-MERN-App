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
            localStorage.setItem("user", JSON.stringify(action.payload));
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
                        commentDate: action.payload.commentDate,
                    });
                }
                return post;
            });

            return { ...state, posts: newPosts };

        case "LIKE_POST":
            let posts = state.posts.map((post) => {
                if (post._id === action.payload.postId) {
                    if (action.payload.myAction === "like") {
                        post.likes++;
                    } else {
                        post.likes--;
                    }
                }
                return post;
            });

            let likes = state.user.likes;
            if (action.payload.myAction === "like") {
                likes++;
            } else {
                likes--;
            }
            return { ...state, posts, user: { ...state.user, likes } };

        case "SET_LOGOUT":
            return { ...state, user: null, isLoggedIn: false };

        default:
            return state;
    }
};
