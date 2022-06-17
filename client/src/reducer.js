const root = document.querySelector(":root");

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
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
            };

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

        case "SET_DARK_MODE":
            localStorage.setItem("lightMode", false);

            root.style.setProperty("--white", "#0c121c");
            root.style.setProperty("--bg-1", "#161d27");
            root.style.setProperty("--bg-2", "#202a38");
            root.style.setProperty("--bg-3", "#425472");
            root.style.setProperty("--highlight-1", "#C84B31");
            root.style.setProperty("--highlight-2", "#e77554");
            root.style.setProperty("--btn-bg-1", "#C84B31");
            root.style.setProperty("--btn-bg-2", "#e77554");
            root.style.setProperty("--btn-text", "#ECDBBA");
            root.style.setProperty("--text-1", "#ECDBBA");
            root.style.setProperty("--text-2", "#d4c5a7");
            root.style.setProperty("--text-3", "#96a0b1");

            return { ...state, lightMode: false };

        case "SET_LIGHT_MODE":
            localStorage.setItem("lightMode", true);

            root.style.setProperty("--white", "#ffffff");
            root.style.setProperty("--bg-1", "#f6f0ed");
            root.style.setProperty("--bg-2", "#d2cecc");
            root.style.setProperty("--bg-3", "#aca8a6");
            root.style.setProperty("--highlight-1", "#38539e");
            root.style.setProperty("--highlight-2", "#101d42");
            root.style.setProperty("--btn-bg-1", "#38539e");
            root.style.setProperty("--btn-bg-2", "#101d42");
            root.style.setProperty("--btn-text", "#f6f0ed");
            root.style.setProperty("--text-1", "rgb(18, 18, 18)");
            root.style.setProperty("--text-2", "rgb(115, 114, 114)");
            root.style.setProperty("--text-3", "rgb(64, 63, 63)");

            return { ...state, lightMode: true };

        case "SET_IS_LOADING":
            return { ...state, isLoading: false };

        case "SET_ALL_USERS":
            return { ...state, allUsers: action.payload };

        case "SET_ALL_POSTS":
            return { ...state, allPosts: action.payload };

        case "SET_HOME_FILTER":
            return { ...state, homeFilter: action.payload };

        case "SET_PROFILE_FILTER":
            return { ...state, profileFilter: action.payload };

        default:
            return state;
    }
};
