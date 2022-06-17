import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
    const initialState = {
        user: null,
        allUsers: [],
        isLoggedIn: false,
        alert: "",
        alertCategory: "alertInfo",
        posts: [],
        allPosts: [],
        isLoading: true,
        lightMode: true,
        homeFilter: "latest",
        profileFilter: "posts",
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setAlert = (message, category = "alertInfo") => {
        dispatch({ type: "SET_ALERT", payload: { message, category } });
    };

    const clearAlert = () => {
        dispatch({ type: "CLEAR_ALERT" });
    };

    const setUser = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    };

    const addToPosts = (post) => {
        dispatch({ type: "ADD_TO_POSTS", payload: post });
    };

    const setPosts = (posts) => {
        dispatch({ type: "SET_POSTS", payload: posts });
    };

    const addComment = (comment) => {
        dispatch({ type: "ADD_COMMENT", payload: comment });
    };

    const setLogout = () => {
        dispatch({ type: "SET_LOGOUT" });
    };

    const likePostReducer = ({ postId, userId, myAction }) => {
        dispatch({
            type: "LIKE_POST",
            payload: { postId, userId, myAction },
        });
    };

    const setDarkMode = () => {
        dispatch({ type: "SET_DARK_MODE" });
    };

    const setLightMode = () => {
        dispatch({ type: "SET_LIGHT_MODE" });
    };

    const setIsLoading = () => {
        dispatch({ type: "SET_IS_LOADING" });
    };

    const setAllUsersReducer = (users) => {
        dispatch({ type: "SET_ALL_USERS", payload: users });
    };

    const setAllPosts = (allPosts) => {
        dispatch({ type: "SET_ALL_POSTS", payload: allPosts });
    };

    const setHomeFilter = (filter) => {
        dispatch({ type: "SET_HOME_FILTER", payload: filter });
    };

    const setProfileFilter = (filter) => {
        dispatch({ type: "SET_PROFILE_FILTER", payload: filter });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                clearAlert,
                setAlert,
                setUser,
                addToPosts,
                setPosts,
                addComment,
                setLogout,
                likePostReducer,
                setDarkMode,
                setLightMode,
                setIsLoading,
                setAllUsersReducer,
                setAllPosts,
                setHomeFilter,
                setProfileFilter,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
