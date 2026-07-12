import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaPlusCircle, FaList, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="sidebar">

            <h2 className="logo">
                💰 Finance Assistant
            </h2>

            <div className="nav-links">

                <Link
                    to="/dashboard"
                    className={location.pathname === "/dashboard" ? "active" : ""}
                >
                    <FaHome /> Dashboard
                </Link>

                <Link
                    to="/add"
                    className={location.pathname === "/add" ? "active" : ""}
                >
                    <FaPlusCircle /> Add Expense
                </Link>

                <Link
                    to="/expenses"
                    className={location.pathname === "/expenses" ? "active" : ""}
                >
                    <FaList /> Expenses
                </Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt /> Logout
                </button>

                <button onClick={() => navigate("/budget")}>
                    Budget
                </button>

                <button onClick={() => navigate("/reports")}>
                    Reports
                </button>

            </div>

        </div>
    );
}