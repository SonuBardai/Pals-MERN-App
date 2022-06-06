import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const StateProvider = ({ children }) => {
    const initialState = {
        user: null,
        isLoggedIn: false,
        alert: "",
        alertCategory: "alertInfo",
        navigator: useNavigate(),
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setAlert = (message, category) => {
        dispatch({ type: "SET_ALERT", payload: { message, category } });
    };

    const clearAlert = () => {
        dispatch({ type: "CLEAR_ALERT" });
    };

    const setUser = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    };

    return (
        <AppContext.Provider
            value={{ ...state, clearAlert, setAlert, setUser }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
