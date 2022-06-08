import axios from "./axios";

export const refreshAccessToken = (callbackFun, setAlert) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        navigator("/login");
        return setAlert("Please Log In");
    }
    axios
        .post("/auth/refresh", { token: refreshToken })
        .then((res) => {
            const newAccessToken = res.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            callbackFun();
        })
        .catch((err) => {
            console.log(err);
            navigator("/login");
            return setAlert();
        });
};
