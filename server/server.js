const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./database/db");

const authRoutes = require("./routes/auth");
console.log("✅ Auth routes loaded");
const app = express();

app.use(cors());
app.use(express.json());
app.post("/test", (req, res) => {
    res.json({
        success: true,
        message: "Test route working"
    });
});
app.use("/api/auth", (req, res, next) => {
    console.log("✅ Auth route reached:", req.method, req.url);
    next();
}, authRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Finance Assistant Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});