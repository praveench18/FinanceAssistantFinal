const express = require("express");

const router = express.Router();

const {
    saveBudget,
    getBudget
} = require("../controllers/budgetController");
router.post("/save", saveBudget);
router.get("/current", getBudget);
module.exports = router;
