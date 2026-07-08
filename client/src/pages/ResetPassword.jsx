import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { toast } from "react-toastify";

export default function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        
        if (!passwordRegex.test(password)) {
            
            setError(
                "Password must contain 8+ characters, uppercase, lowercase, number and special character."
            );
            
            return;
        }
        setLoading(true);

        try {

            const res = await API.post("/auth/reset-password", {
                email,
                password
            });

            if (res.data.success) {

                toast.success(res.data.message);

                navigate("/");

            } else {

                setError(res.data.message);
                toast.error(res.data.message);

            }

        } catch (err) {

            const message =
                err.response?.data?.message || "Something went wrong.";

            setError(message);
            toast.error(message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>Reset Password</h1>

                <div className="form-group">

                    <label>New Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />

                </div>

                <div className="form-group">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                    />

                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <button
                    className="login-btn"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>

        </div>

    );

}