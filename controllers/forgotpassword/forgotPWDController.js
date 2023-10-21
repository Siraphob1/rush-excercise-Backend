const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');
const nodemailer = require("nodemailer");
const messageResetPWDEmail = require('../../model/email/resetForgotPWD/resetForgotPWD');


const forgotPWDController = async (req ,res) =>{
    //email was attached in request body
    const {email} = req.body;
    if(!email) return res.sendStatus(400)      

    try {

        //find user has email
        const queryEmail = {email:email};
        const userFind = await userModel.findOne(queryEmail);
        if(!userFind) return res.sendStatus(404); //Not found

        // create JWT
        const emailToken = jwt.sign(
            {"userID": userFind.userID},                 //payload
            process.env.EMAIL_TOKEN_SECRET,         //secret key
            {expiresIn: '60s'}                       //option expire for this Token
        );

        // create url ResetForgotpassword
        let urlResetForgotpassword = `${process.env.FRONTENDHOST}/forgotpassword/reset?token=${emailToken}`;
        
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
            subject: 'Reset your password',
            html:messageResetPWDEmail(userFind.username , urlResetForgotpassword)
        }

        //SendMail
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(503).json({'sendestatus': 'failed'});
            } else {
                console.log('Email sent: ' + info.response);    
                // res.status(200).json({'sendestatus': urlResetForgotpassword});
                res.status(200).json({'sendestatus': emailToken});
            }
        });


        
    } catch (error) {
        res.status(500).json({'error':error.message})
    }
}

module.exports = forgotPWDController;