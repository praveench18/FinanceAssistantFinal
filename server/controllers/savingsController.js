const db = require("../database/db");
exports.saveGoal = (req, res) => {
    const {
        goalName,
        targetAmount,
        targetMonths
    } = req.body;
    db.run(
        `INSERT INTO savingsGoals
        (goalName,targetAmount,targetMonths)
        VALUES(?,?,?)`,
        [
            goalName,
            targetAmount,
            targetMonths
        ],
        function(err){
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Database error."
                });
            }
            res.json({
                success:true,
                message:"Goal saved successfully."
            });
        }
    );

};

exports.getGoals = (req,res)=>{
    db.all(
        "SELECT * FROM savingsGoals",
        [],
        (err,rows)=>{
            if(err){
                return res.status(500).json({
                    success:false
                });
            }
            res.json(rows);
        }
    );
};