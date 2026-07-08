import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!email.trim()) {
        setError("Email is required.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setError("Please enter a valid email.");
        return;
    }

    setLoading(true);

    try {

        const res = await API.post("/auth/forgot-password", {
            email
        });
        if (res.data.success) {

            toast.success(res.data.message);

            navigate("/verify-otp", {
                state: {
                    email
                }
            });

        }else {
            setError(res.data.message);
            toast.error(res.data.message);
        }

    } catch (err) {
      console.error(err);        
        const message =
            err.response?.data?.message || "Something went wrong.";

        setError(message);
        toast.error(message);

    } finally {

        setLoading(false);

    }
      const otpExpiry = Date.now() + 5 * 60 * 1000;
            await new Promise((resolve, reject) => {
        });
        await sendEmail(
            email,
            "Finance Assistant Password Reset OTP",
        `Finance Assistant

        Hello,

        Your password reset OTP is:

        ${otp}

        This OTP is valid for 5 minutes.

        If you didn't request a password reset, you can safely ignore this email.

        Regards,
        Finance Assistant Team`
        );
        return res.json({
    success: true,
    message: "OTP sent successfully."
});

};

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>

                <h1>Forgot Password</h1>

                <p className="login-subtitle">
                    Enter your registered email
                </p>

                <div className="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
                </div>

                <button
                    className="login-btn"
                    disabled={loading}
                >
                    Send OTP
                </button>

            </form>
        </div>
    );
          
}