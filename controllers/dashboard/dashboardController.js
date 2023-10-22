const activityModel = require('../../model/activitySchema');

const dashboardController = async (req ,res) =>{

    //userID was not attached in req body
    const {userID} = req.params
    if(!userID) return res.status(400).json({"error":"bad request"});

   try {
         //find group of activities  and  count
        const aggregate = await activityModel.aggregate([
            {
                $group:{
                    _id: "$status",
                    count: {$count:{}}
                }
            }
        ])

        //format data before response
        const aggregateResponse = aggregate.map((element)=>{
            const activity = {
                status: element._id,
                count:element.count
            }
            return activity;
        })    
        res.status(200).json({"message":aggregateResponse})
    
   } catch (error) {
        //server error
        res.sendStatus(500)
   }
}

module.exports = dashboardController;