const express = require("express");

const router = express.Router();

const {
    addExpense,
    getExpenses,
    deleteExpense
} = require("../controllers/expenseController");

router.post("/add", addExpense);

router.get("/all", getExpenses);

router.delete("/delete/:id", deleteExpense);

module.exports = router;