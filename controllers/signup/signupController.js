const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');
const messageVerifyEmail = require('../../model/email/verifySignup/verifysignup');
const nodemailer = require("nodemailer");



const signupController = async (req , res) =>{
    //username , email , password and createDate was attached in request body
    const {username , email ,password , createDate} = req.body;
    if(!username || !email || !password || !createDate) return res.status(400).json({"message":"username , email and password are required"});
    
    

    try {

        //check email duplicate in DB
        const queryEmail = {email:email};
        const duplicateEmail = await userModel.findOne(queryEmail);    
        if(duplicateEmail) return res.status(409).json({"message":'this email address has already been signup'});

        //check username duplicate in DB
        const queryUsername = {username: username}
        const duplicateUsername = await userModel.findOne(queryUsername);
        if(duplicateUsername) return res.status(409).json({"message":'This username has already been signup'});

        //encrypt password and userid
        const hashPassword = await bcrypt.hash(password , 12);
        const hashUserid = await bcrypt.hash(username,12);

        
        // create JWT
        const emailToken = jwt.sign(
            {"userID": hashUserid},                 //payload
            process.env.EMAIL_TOKEN_SECRET,         //secret key
            {expiresIn: '15m'}                       //option token will  expire in 15 minute 
        );  
        
        
        //create url for Signup verify
        const urlVerify = `${process.env.BACKENDWEBHOST}/signup/verify?token=${emailToken}`

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

        //SendMail and handle error
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(503).json({'sendestatus': 'server can not send email'});
            } 
            // else {
            //     console.log('Email sent: ' + info.response);    
            // }
        });


        
        //create model and saveto DB
        const result = await userModel.create({
           "username": username,
            "userID": hashUserid,
            "email":email,
            "password": hashPassword,
            "createDate": createDate,
        });

        //create  and savet to DB success
        res.status(201).json({"message": `username:${username} signup success`});       
        
    } catch (error) {
        //server error
        res.status(500).json({"error":error.message})
    }

}

module.exports = signupController;