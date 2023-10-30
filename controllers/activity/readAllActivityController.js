const activityModel = require('../../model/activitySchema');

const readAllActivitiesController = async (req ,res)=>{
    // console.log('this route')
    //userID was not attached in req query
    const {userID} = req.query;
    if(!userID) return res.status(400).json({"error":"bad request"});

    //get all acitivities from DB
    const queryID = {userID:userID}
    const userAcitivities = await activityModel.find(queryID);
    //console.log(userAcitivities);

    //format  all activities for response
    const responseActivities = userAcitivities.map((element)=>{
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

    //console.log(responseActivities)

    res.status(200).json({"activitiesList":responseActivities})
    // res.status(200)
}

module.exports = readAllActivitiesController;