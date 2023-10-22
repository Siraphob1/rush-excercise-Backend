const activityModel = require('../../model/activitySchema');

const readAllActivitiesController = async (req ,res)=>{

    //userID was not attached in req body
    const {userID} = req.params;
    if(!userID) return res.status(400).json({"error":"bad request"});

    //get all acitivities from DB
    const queryID = {userID:userID}
    const userAcitivities = await activityModel.find(queryID);
    // console.log(userAcitivities);

    //format  all activities 
    const getActivities = userAcitivities.map((element)=>{
        const activity = {
            activityID: element._id,
            name:element.name,
            description:element.description,
            type:element.type,
            startDate: element.startDate,
            endDate: element.endDate,
            createDate: element.createDate,
            status: element.status,
        }
        return activity;
    })

    

    res.status(200).json({"your activities":getActivities})
    // res.status(200)
}

module.exports = readAllActivitiesController;