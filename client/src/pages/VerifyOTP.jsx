import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { toast } from "react-toastify";

export default function VerifyOTP() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!otp.trim()) {
            setError("Please enter OTP.");
            return;
        }
        setLoading(true);
        try {
            const res = await API.post("/auth/verify-otp", {
                email,
                otp
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/reset-password", {
                    state: { email }
                });
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
            <h1>Verify OTP</h1>
                <p className="login-subtitle">
                    Enter the OTP sent to your email
                </p>
                <div className="form-group">
                    <label>OTP</label>

                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
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
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </form>
        </div>
    );
}