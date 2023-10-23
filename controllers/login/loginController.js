const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');

const loginController = async (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password) return res.status(400).json({"message":"email and password are required"});
   
    //find user
    const queryEmail = {email:email};
    const userFind = await userModel.findOne(queryEmail);    
    if(!userFind) return res.status(404).json({"message":"this email is not signup"}); //Not found

    //user has verify email
    if(!userFind.isVerify) return res.status(401).json({"message":"this email is not verify, Please verify your email address"}); //Unauthorized

    // compare password
    const match = await bcrypt.compare(password , userFind.password);
    
    // login sucess
    if(match){

        //create accessToken for use web while login  
        const accessToken = jwt.sign(
            {"userID": userFind.userID},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        //create refreshToken for use request new accessToken
        const refreshToken = jwt.sign(
            {"userID": userFind.userID},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30s'}  //1h every 1hour force logout            
        );
        //console.log(refreshToken)

        //save refreshToken when login
        const query = {email: email};
        const userUpdate = {refreshToken:`${refreshToken}`};
        const resultUpdate = await userModel.findOneAndUpdate(query , userUpdate);
        const cookieOption = {httpOnly:true , maxAge: 24 * 60 * 60 * 1000};  //24hour
        res.cookie('jwt', refreshToken , cookieOption );
        res.status(200).json({accessToken});
    }

    else{
        // login failed
        res.status(401).json({"message":"password is wrong"});
    }


}

module.exports = loginController;