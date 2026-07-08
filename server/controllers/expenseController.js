const db = require("../database/db");

exports.addExpense = (req, res) => {

    const { title, amount, category, expenseDate } = req.body;

    db.run(
        "INSERT INTO expenses(title,amount,category,expenseDate) VALUES(?,?,?,?)",
        [title, amount, category, expenseDate],
        function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                success: true,
                message: "Expense Added Successfully"
            });
        }
    );
};
exports.getExpenses = (req, res) => {

    db.all(
        "SELECT * FROM expenses ORDER BY id DESC",
        [],
        (err, rows) => {
            if (err)
                return res.status(500).json(err);
            res.json(rows);
        }
    );
};
exports.deleteExpense = (req, res) => {

    db.run(
        "DELETE FROM expenses WHERE id=?",
        [req.params.id],
        function (err) {
            if (err)
                return res.status(500).json(err);
            res.json({
                success: true,
                message: "Expense Deleted"
            });
        }
    );
};
exports.updateExpense = (req, res) => {

    const { id } = req.params;

    const {
        title,
        amount,
        category,
        expenseDate
    } = req.body;

    db.run(
        `UPDATE expenses
         SET title=?,
             amount=?,
             category=?,
             expenseDate=?
         WHERE id=?`,
        [
            title,
            amount,
            category,
            expenseDate,
            id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }
            res.json({
                success: true,
                message: "Expense updated successfully."
            });
        }
    );
};