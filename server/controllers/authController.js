const db = require("../database/db");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }
    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (user) {
                return res.json({
                    success: false,
                    message: "Email already exists"
                });
            }
            const samePassword = await bcrypt.compare(
            password,
            user.password
            );
            if (samePassword) {
            return res.json({
                success: false,
                message: "New password cannot be the same as your old password."
            });

            }

            const hashedPassword = await bcrypt.hash(password,10);

            db.run(
                "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                [name,email,hashedPassword],
                function(err){

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.json({
                        success:true,
                        message:"Registration Successful"
                    });

                }
            );

        }
    );

};

exports.login = (req,res)=>{
    const {email,password}=req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        async(err,user)=>{
            if(err)
                return res.status(500).json(err);
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"Email not registered"
                });
            }

            const match=await bcrypt.compare(password,user.password);
            if(!match){
                return res.status(401).json({
                    success:false,
                    message:"Incorrect Password"
                });
            }
            res.json({
                success:true,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                }
            });
        });
};
exports.ForgotPassword = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required."
        });
    }

    try {
        const user = await new Promise((resolve, reject) => {

            db.get(
                "SELECT * FROM users WHERE email=?",
                [email],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });if (!user) {
            return res.json({
                success: false,
                message: "Email is not registered."
            });
        }
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpExpiry = Date.now() + 5 * 60 * 1000;
        await new Promise((resolve, reject) => {

        db.run(
            "UPDATE users SET otp=?, otpExpiry=? WHERE email=?",
            [otp, otpExpiry, email],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
        await sendEmail(
        email,
        "Finance Assistant Password Reset OTP",
        `Your OTP is ${otp}. It is valid for 5 minutes.`
    );
        return res.json({
        success: true,
        message: "OTP sent successfully."
    });
    } catch (err) {

    console.error("Forgot Password Error:", err);

    return res.status(500).json({
        success: false,
        message: err.message
    });

}
};
exports.VerifyOTP = (req, res) => {

    const { email, otp } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found."
                });
            }
            if (user.otp !== otp) {
                return res.json({
                    success: false,
                    message: "Invalid OTP."
                });
            }
            if (Date.now() > user.otpExpiry) {
                return res.json({
                    success: false,
                    message: "OTP has expired."
                });
            }
            res.json({
                success: true,
                message: "OTP verified successfully."
            });
        }
    );
};
exports.ResetPassword = async (req, res) => {

    const { email, password } = req.body;
    const user = await new Promise((resolve, reject) => {

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, row) => {

            if (err) reject(err);
            else resolve(row);
        }
    );
});
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please fill all fields."
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `UPDATE users
             SET password = ?, otp = NULL, otpExpiry = NULL
             WHERE email = ?`,
            [hashedPassword, email],
            function (err) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database error."
                    });
                }
                return res.json({
                    success: true,
                    message: "Password reset successfully."
                });
            }
        );
    } catch (err) {

        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }

};
