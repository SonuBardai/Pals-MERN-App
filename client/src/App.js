import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

import { StateProvider } from "./context";

function App() {
    return (
        <div>
            <Router>
                <StateProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users/:name" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/*" element={<Error />} />
                    </Routes>
                </StateProvider>
            </Router>
        </div>
    );
}

export default App;
