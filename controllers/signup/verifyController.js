const userModel = require('../../model/userSchema');
const jwt = require('jsonwebtoken');

const verifyController = async (req , res) =>{
    const {token} = req.query;
    if(!token) return res.status(401).json({"message":"token error"});

    let userid = '';
    let isError = false;
    //evaluate JWT
    jwt.verify(
        token,
        process.env.EMAIL_TOKEN_SECRET,
        (err , decodeed)=>{
            if(!err){
                userid = decodeed.userid;                
            }
            else{
                return isError = true;
            }  
        }
    )
    
    if(isError) return res.sendStatus(403);
    try {
        //find user
        const queryUserid = {userid:userid};
        const userFind = await userModel.findOne(queryUserid);
        if(!userFind) return res.sendStatus(404)    //not found user

        //verify first time ?
        if(userFind.isverify)   return res.status(409).json({"message": "this email address has already been verify"})
        const query = {userid: userid};
        const updateVerify = {isverify: true};
        const resultUpdate = await userModel.findOneAndUpdate(query , updateVerify , {new:true}); 
        const urlVerifySuccess = `${process.env.FRONTENDHOST}`;
        res.status(204).redirect(urlVerifySuccess);
        
    } catch (error) {
        res.status(500).json({"error":error.message})
    }    
   
}

module.exports = verifyController;