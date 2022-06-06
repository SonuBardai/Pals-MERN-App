import { IoCloseOutline } from "react-icons/io5";
import { useGlobalContext } from "../../context";
import "./alert.css";

const Alert = ({ alert, category }) => {
    const { clearAlert } = useGlobalContext();
    return (
        <>
            <div className={`alert ${category}`}>
                <span>{alert}</span>
                <IoCloseOutline className="alertClose" onClick={clearAlert} />
            </div>
        </>
    );
};

export default Alert;
