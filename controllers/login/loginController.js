const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');

const loginController = async (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password) return res.status(400).json({"message":"email and password are required"});
   
    //find user
    const queryEmail = {email:email};
    const userFind = await userModel.findOne(queryEmail);    
    if(!userFind) return res.sendStatus(401); //Unauthorized

    //user has verify email
    if(!userFind.isverify) return res.sendStatus(401); //Unauthorized

    // compare password
    const match = await bcrypt.compare(password , userFind.password);
    
    // login sucess
    if(match){

        //create accessToken for use web while login  
        const accessToken = jwt.sign(
            {"username": userFind.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15s'}
        );
        //create refreshToken for use request new accessToken
        const refreshToken = jwt.sign(
            {"username": userFind.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1h'}  //1h every 1hour force logout            
        );

        //save refreshToken when login
        const query = {email: email};
        const userUpdate = {refreshToken:`${refreshToken}`};
        const resultUpdate = await userModel.findOneAndUpdate(query , userUpdate);
        const cookieOption = {httpOnly:true , maxAge: 24 * 60 * 60 * 1000};  //24hour
        res.cookie('jwt', refreshToken , cookieOption );
        res.json({accessToken});
    }

    // login failed
    else{
        res.sendStatus(401);
    }


}

module.exports = loginController;