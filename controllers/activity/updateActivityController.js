const activityModel = require('../../model/activitySchema');

const updateActivityController = async (req ,res) =>{

    //userID was not attached in req query
    const {userID} = req.query;
    if(!userID) return res.status(400).json({"error":"bad request"});

    //activityID was not attached in req query
    const {activityID} = req.query;
    if(!activityID) return res.status(400).json({"error":"bad request"});

    //name or description was not attached in req body
    const {name , description , status} = req.body;
    if(!name || !description) return res.status(400).json({"error":"bad request"});
        
    
    try {
        //find activity and update in DB
        const updateData = status ? {name:name , description:description ,status: status}
                                  : {name:name , description:description}
        const activityFind = await activityModel.findByIdAndUpdate(activityID , updateData);
        if(!activityFind) return res.sendStatus(404);
        // console.log(activityFind)
        res.json({"message":userID})

    } catch (error) {
        //server error
        res.sendStatus(500);
    }





    
}

module.exports = updateActivityController;