const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register the user

router.post("/register",async(req,res)=>{

    try{
        console.log("trying to create new User");
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });

        const user = await newUser.save();
        const {password, ...info}= user._doc;
        res.status(201).json(info);
    }catch(err){
        res.status(500).json(err);
    }
});


//login

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(user){
            //decrypt the password
            const bytes  = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
            const Password = bytes.toString(CryptoJS.enc.Utf8);

            if(Password === req.body.password){

                const accessToken = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },
                    process.env.JWT_SEC,
                    {expiresIn:"3d"}
                );


                const {password, ...info}= user._doc;
                res.status(200).json({...info,accessToken});
            }else{
                res.status(401).json("Wrong Credentials");
            }

        }else{
            res.status(401).json("Wrong Credentials");
        }

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;