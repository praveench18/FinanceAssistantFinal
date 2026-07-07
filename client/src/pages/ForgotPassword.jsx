import { useState } from "react";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email);
    };

    return (
        <div className="forgot-container">

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">
                    Send OTP
                </button>

            </form>

        </div>
    );
}

export default ForgotPassword;