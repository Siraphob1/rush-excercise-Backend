const dashboardController = (req ,res) =>{
    const {userid} = req.query
    console.log(req.query);
    res.status(200).json({"message":userid})
}

module.exports = dashboardController;