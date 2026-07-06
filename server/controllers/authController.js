const db = require("../database/db");
const bcrypt = require("bcrypt");

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

                return res.json({
                    success:false,
                    message:"User not found"
                });

            }

            const match=await bcrypt.compare(password,user.password);

            if(!match){

                return res.json({
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

        }
    );

};