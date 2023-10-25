const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');


const resetPWDController = async (req ,res) =>{
    
    //newpassword was attached in request body
    const {newpassword} = req.body;
    if(!newpassword) return res.sendStatus(400) 

    //emailToken was attached in request query
    const {token} = req.query;
    if(!token) return res.sendStatus(400);

    let userID = '';
    let isError = false;
   //evaluate JWT
    jwt.verify(
        token,
        process.env.EMAIL_TOKEN_SECRET,
        (err , decodeed)=>{
            if(!err){
                userID = decodeed.userID;                
            }
            else{
                return isError = true;
            }  
        }
    )

    //JWT expire or incorrect
    if(isError) return res.sendStatus(403);
    
    try {

        //find user
        const queryUserid = {userID:userID};
        const userFind = await userModel.findOne(queryUserid);
        if(!userFind) return res.sendStatus(404);    //not found user

        //hash password
        const hashNewPassword = await bcrypt.hash(newpassword , 12);

        //update password
        const updatePassword = {password: hashNewPassword};     
        const resultUpdate = await userModel.findOneAndUpdate(queryUserid , updatePassword , {new:true}); 
        res.sendStatus(204);    //ok no content return

    } catch (error) {   
        //server error
        res.status(500).json({"error":error.message})
        
    }


}

module.exports = resetPWDController;