import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {  
    return (
        <>
            <div>
                <div className="heroText">
                    <h1 className="heroLogo">pals</h1>
                    <p className="heroQuote">Bringing friends together</p>
                    <div className="btnGroup">
                        <Link to={"/login"} className="btn">
                            Login
                        </Link>
                        <Link to={"/register"} className="btn">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
