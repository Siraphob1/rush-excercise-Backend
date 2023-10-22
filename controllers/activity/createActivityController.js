const activityModel = require('../../model/activitySchema');
const userModel = require('../../model/userSchema');

const createActivityController = async (req , res) =>{
    
    //userID was not attached in req params
    const {userID} = req.params;
    if(!userID) return res.status(400).json({"error":"bad request"});

    //name , description , type , startDate , endDate and createDate was not attached in req body
    const {name , description , type , startDate , endDate , createDate} = req.body;
    if(!name || !description || !type || !startDate || !endDate || !createDate) return res.sendStatus(400);

    try {

        //find user has userID
        const queryID = {userID:userID}
        const userFind = await userModel.findOne(queryID);
        //console.log(userFind)

        //create new activity 
        const result = await activityModel.create({
            "userID": userID,
            "name":name,
            "description":description,
            "type":type,
            "startDate": startDate,
            "endDate": endDate,
            "createDate": createDate,
        });
        //console.log(result)

        res.status(201).json({"result":result})
    } catch (error) {
        //server error 
        res.sendStatus(500);
    }
}

module.exports = createActivityController;