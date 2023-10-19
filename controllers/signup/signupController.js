const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');
const messageVerifyEmail = require('../../model/email/verifysignup');
const nodemailer = require("nodemailer");


const signupController = async (req , res) =>{
    const {username , email ,password} = req.body;
    if(!username || !email || !password) return res.status(400).json({"message":"username , email and password are required"});
    
    //check email duplicate in DB
    const queryEmail = {email:email};
    const duplicateEmail = await userModel.findOne(queryEmail);    
    if(duplicateEmail) return res.status(409).json({"message":'this email address has already been signup'});

    //check username duplicate in DB
    const queryUsername = {username: username}
    const duplicateUsername = await userModel.findOne(queryUsername);
    if(duplicateUsername) return res.status(409).json({"message":'This username is already in use.'});

    try {
        //encrypt password and userid
        const hashPassword = await bcrypt.hash(password , 12);
        const hashUserid = await bcrypt.hash(username,12);

        //create model and saveto DB
        const result = await userModel.create({
            "username": username,
            "userid": hashUserid,
            "email":email,
            "password": hashPassword
        });
        // console.log(result)


        // create JWT
        const emailToken = jwt.sign(
            {"userid": hashUserid},                 //payload
            process.env.EMAIL_TOKEN_SECRET,         //secret key
            {expiresIn: '60s'}                       //option expire for this Token
        );
        // console.log(emailToken);      
        
        
        //create url for verify
        const urlVerify = `http://localhost:${process.env.PORT}/signup/verify?token=${emailToken}`

        //Create tranpoter
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.Transporter_Email,
                pass: process.env.Transporter_Password
            }
        });

        //Setup message options
        const  mailOptions = {
            from: process.env.Transporter_Email,
            to: email,
            subject: 'To proceed with your login to RUSH Exercise, please verify your email',
            html:messageVerifyEmail(username , urlVerify)
        }

        //SendMail
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(503).json({'sendestatus': 'failed'});
            } else {
                console.log('Email sent: ' + info.response);    
                res.status(201).json({'sendestatus': username});
            }
        });


        // res.status(201).json({"message": `username:${username} signup success`});
    } catch (error) {
        res.status(500).json({"message":error.message})
    }

}

module.exports = signupController;