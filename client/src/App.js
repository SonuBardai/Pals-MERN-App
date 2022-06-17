import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import FilteredPosts from "./pages/FilteredPosts/FilteredPosts.jsx";

import { useGlobalContext } from "./context";
import { useEffect } from "react";
import axios from "./axios";

function App() {
    const { setUser, setIsLoading } = useGlobalContext();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            axios
                .get(`/users/${user._id}`)
                .then((res) => (user = res.data))
                .catch((err) => console.log(err));
            setUser(user);
        } else {
            setIsLoading();
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tags/:tag" element={<FilteredPosts />} />
                <Route path="/users/:id" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
