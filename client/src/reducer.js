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

        default:
            return state;
    }
};
