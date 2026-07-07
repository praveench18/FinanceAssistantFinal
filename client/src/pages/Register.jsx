import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
const [loading, setLoading] = useState(false);
export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    try {

      const res = await API.post("/auth/register", formData);

      toast.success(res.data.message);

      if (res.data.success) {
        navigate("/");
      }

    } catch (err) {
      toast.error("Registration Failed");
      console.log(err);
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
                />

            </div>

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
                {loading ? "Registering..." : "Register"}
            </button>

            <p className="register-link">
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>

        </form>

    </div>
  );
}