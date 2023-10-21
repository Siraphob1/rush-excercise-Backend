const jwt = require('jsonwebtoken');
const userModel = require('../../model/userSchema');

const refreshTokenController = async (req , res) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies);
    const refreshToken = cookies.jwt;

     //find user
     const queryrefreshToken = {refreshToken:refreshToken};
     const userFind = await userModel.findOne(queryrefreshToken);    
     if(!userFind) return res.sendStatus(401); //Unauthorized
     //evaluate JWT
     jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err , decoded) =>{
            if(err || userFind.userID !== decoded.userID) return res.sendStatus(403);
            //create new accessToken 
            const accessToken = jwt.sign(
                {"userID": decoded.userID},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.status(200).json({accessToken});    
        }
     )
}

module.exports = refreshTokenController;