const userModel = require('../../model/userSchema');

const readProfileController = async (req , res) =>{

    //userIDwas attached in request query
    const {userID} = req.query;
    if(!userID) return res.sendStatus(400);

    try {

        //find user in DB
        const queryuserID = {userID:userID};
        const userFind = await userModel.findOne(queryuserID);   
        if(!userFind) return res.sendStatus(404);       //not found

        //format userData
        const userData = {
            imageURL:userFind.imageURL,
            username: userFind.username,
            displayName:userFind.displayName,
            age:userFind.age,
            height:userFind.height,
            weight:userFind.weight,
            caption:userFind.caption
        }
        res.status(200).json({"userProfile":userData});
    } catch (error) {        
        res.status(500).json({"error":error.message})
    }
    
}

module.exports = readProfileController;