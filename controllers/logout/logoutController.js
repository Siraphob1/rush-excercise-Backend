const userModel = require('../../model/userSchema');

const logoutController = async (req ,res) =>{
    const cookies = req.cookies;

    //check has cookies JWT
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    //is refreshToken in DB
    const queryrefreshToken = {refreshToken , refreshToken};
    const userFind = await userModel.findOne(queryrefreshToken);
    if(!userFind){
        res.clearCookie('jwt', {httpOnly: true ,sameSite:'None' , secure:true});
        return res.sendStatus(204);
    }

    //delete refreshToken in DB
    const userUpdate = {refreshToken: ''}
    const resultUpdate = await userModel.findOneAndUpdate(queryrefreshToken , userUpdate);

    res.clearCookie('jwt', {httpOnly: true ,sameSite:'None' , secure:true});
    res.sendStatus(204);
   
}

module.exports = logoutController;