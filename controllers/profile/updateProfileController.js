const userModel = require('../../model/userSchema');

const tryParsInt = ( dataString ) =>{
    dataString = typeof dataString === "string" ? parseInt(dataString) 
                                                : typeof dataString === "number"    ? dataString
                                                                                    : undefined    
    return dataString
}

const updateProfileController = async (req , res) =>{

    //userIDwas attached in request params
    const {userID} = req.params;
    if(!userID) return res.sendStatus(400);

    //imageURL , username , displayName , age , height , weight , caption  was not  attached in request body
    let {imageURL , username , displayName , age , height , weight , caption} = req.body;
    if(!imageURL && !username && !displayName && !age && !height && !weight && !caption) return res.sendStatus(400);

    
    //if type not equal number try convert type to number    
    age = tryParsInt(age);
    height = tryParsInt(height);
    weight = tryParsInt(weight);

    try {

        //find user in DB
        const queryuserID = {userID:userID};
        const userFind = await userModel.findOne(queryuserID);
        if(!userFind) return res.sendStatus(404);
        // console.log("before update");
        // console.log(userFind);

        //format data for updateData user         
        const updateUserData = {
            imageURL: imageURL? imageURL : userFind.imageURL,
            username: username? username : userFind.username,
            displayName: displayName ? displayName : userFind.displayName,
            age: age ? age : userFind.age,
            height: height ? height :userFind.height,
            weight: weight ? weight : userFind.weight,
            caption: caption ? caption : userFind.caption
        }
       
        //update data user
        const resultUpdate = await userModel.findOneAndUpdate(queryuserID ,updateUserData , {new:true});          
        res.status(200).json({"userData":updateUserData});
    } catch (error) {        
        res.status(500).json({"error":error.message})
    }
        
}





module.exports = updateProfileController;