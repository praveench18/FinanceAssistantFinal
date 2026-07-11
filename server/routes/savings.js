const express = require("express");

const router = express.Router();

const {
    saveGoal,
    getGoals
} = require("../controllers/savingsController");

router.post("/save", saveGoal);

router.get("/all", getGoals);

module.exports = router;