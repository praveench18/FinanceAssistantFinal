import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
export default function Login() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState("false");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }
        if (!formData.password.trim()) {
            setError("Password is required.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setLoading(true);

        try {

            const res = await API.post("/auth/login", formData);

            if (res.data.success) {

                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard");
            }else{
                setError(res.data.message);
                    toast.error(res.data.message);
            }

        } catch (err) {

            console.log(err);
            const message =
                err.response?.data?.message || "Invalid email or password.";
            setError(message);
            toast.error(message);

        }finally {

             setLoading(false);

        }

    };

    return (

        <div
            className="login-container"
        >

            <form
                onSubmit={handleSubmit}
                className="login-card"
            >

                <h1>Finance Assistant</h1>

                <p
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#64748b"
                    }}
                >
                    Sign in to continue
                </p>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>

                <div className="form-group">

                <label>Password</label>

                <div className="password-box">

                     <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}                  
                    </button>
                </div>
                </div>
                <button
                    type="button"
                    className="forgot-password"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot Password?
                </button>
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                >
                   {loading ? (
                        <>
                            <span className="spinner"></span>
                            <span>Logging in...</span>
                        </>
                    ) : (
                        "Login"
                    )}  
                </button>

               <p className="register-link">
                   Don't have an account? <Link to="/register">Register</Link>
                </p>

            </form>

        </div>

    );

}