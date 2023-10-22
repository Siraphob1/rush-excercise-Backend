const activityModel = require('../../model/activitySchema');

const deleteActivityController = async (req ,res) =>{

    //userID was not attached in req body
    const {userID} = req.params
    if(!userID) return res.status(400).json({"error":"bad request"});

    //activityID was not attached in req query
    const {activityID} = req.query;
    if(!activityID) return res.status(400).json({"error":"bad request"});

    
    try {
        //find activity and update in DB
        const updateData = {status:"canceled"};
        const activityFind = await activityModel.findByIdAndUpdate(activityID , updateData);
        if(!activityFind) return res.sendStatus(404);
        // console.log(activityFind)
        res.json({"message":userID})

    } catch (error) {
        //server error
        res.sendStatus(500);
    }





    
}

module.exports = deleteActivityController;