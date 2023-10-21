const userModel = require('../../model/userSchema');

const updateProfileController = async (req , res) =>{

    //userIDwas attached in request params
    const {userID} = req.params;
    if(!userID) return res.sendStatus(400);

    //imageURL , username , displayName , age , height , weight , caption  was not  attached in request body
    let {imageURL , username , displayName , age , height , weight , caption} = req.body;
    if(!imageURL && !username && !displayName && !age && !height && !weight && !caption) return res.sendStatus(400);

    age = typeof age === "string" ? parseInt(age):null
    console.log(`age: ${typeof age}`)
    

    try {

        //find user in DB
        const queryuserID = {userID:userID};
        const userFind = await userModel.findOne(queryuserID);
        if(!userFind) return res.sendStatus(404);
        console.log("before update");
        console.log(userFind);

        //format data for updateData user 
        tryFormatData();
        const updateUserData = {
            imageURL: imageURL? imageURL : userFind.imageURL,
            username: username? username : userFind.username,
            displayName: displayName ? displayName : userFind.displayName,
            age: age ? age : userFind.age,
            height: height ? height :userFind.height,
            weight: weight ? weight : userFind.weight,
            caption: caption ? caption : userFind.caption
        }
       
        const resultUpdate = await userModel.findOneAndUpdate(queryuserID ,updateUserData , {new:true});   
        console.log("after update")
        console.log(resultUpdate)
        if(!resultUpdate) return res.sendStatus(500);       //not found

         
        
        res.status(200).json({"userProfile":updateUserData});
    } catch (error) {        
        res.status(500).json({"error":error.message})
    }
        
}





module.exports = updateProfileController;