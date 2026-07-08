const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

// Connect Database
require("./database/db");

// Import Routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Finance Assistant Backend Running "
    });
});

// Start Server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});

