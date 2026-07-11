const db = require("../database/db");
exports.saveBudget = (req, res) => {
    const { amount, month, year } = req.body;
    db.get(
        "SELECT * FROM budgets WHERE month=? AND year=?",
        [month, year],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }
            if (row) {
                db.run(
                    "UPDATE budgets SET amount=? WHERE id=?",
                    [amount, row.id],
                    function (err) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "Database error."
                            });
                        }
                        res.json({
                            success: true,
                            message: "Budget updated successfully."
                        });
                    }
                );
            } else {
                db.run(
                    "INSERT INTO budgets(amount, month, year) VALUES(?,?,?)",
                    [amount, month, year],
                    function (err) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "Database error."
                            });
                        }
                        res.json({                            success: true,
                            message: "Budget saved successfully."
                        });
                    }
                );
            }
        }
    );
};
exports.getBudget = (req, res) => {
    const { month, year } = req.query;
    db.get(
        "SELECT * FROM budgets WHERE month=? AND year=?",
        [month, year],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }
            res.json(row || { amount: 0 });
        }
    );
};