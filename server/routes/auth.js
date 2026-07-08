const express = require("express");

const router = express.Router();

const {
    register,
    login,
    ForgotPassword,
    VerifyOTP,
    ResetPassword
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp", VerifyOTP);
router.post("/reset-password", ResetPassword);

module.exports = router;