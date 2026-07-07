import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { toast } from "react-toastify";
export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const res = await API.post("/auth/login", formData);

            if (res.data.success) {

                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard");
            }

        } catch (err) {

            console.log(err);
            toast.error("Login Failed");

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
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                />

                </div>
                <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

               <p className="register-link">
                   Don't have an account? <Link to="/register">Register</Link>
                </p>

            </form>

        </div>

    );

}