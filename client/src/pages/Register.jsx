import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
import { toast } from "react-toastify";
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) {
    setError("Name is required.");
    return;
    }

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
        setError("Please enter a valid email.");
        return;
    }
    setLoading(true);

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
    setError(
        "Password must contain at least 8 characters, including an uppercase letter, lowercase letter, number, and special character."
    );
    setLoading(false);
    return;
    }

    try {

      const res = await API.post("/auth/register", formData);
       if (res.data.success) {
            toast.success(res.data.message);
            navigate("/");
        } else {
            setError(res.data.message);
            toast.error(res.data.message);
        }

    } catch (err) {
      const message =
       err.response?.data?.message || "Registration failed.";

        setError(message);
        toast.error(message);
      console.log(err);
    }finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-container">

        <form
            onSubmit={handleSubmit}
            className="login-card"
        >

            <h1>Finance Assistant</h1>

            <p className="login-subtitle">
                Create your account
            </p>

            <div className="form-group">

                <label>Name</label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    disabled={loading}
                />

            </div>

            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    disabled={loading}
                />

            </div>

            <div className="form-group">

                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    disabled={loading}

                />

            </div>
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
                          <span>Registering...</span>
                      </>
                  ) : (
                      "Register"
                  )}
            </button>

            <p className="register-link">
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>

        </form>

    </div>
  );
}