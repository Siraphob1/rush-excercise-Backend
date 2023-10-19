const logoutController = (req ,res) =>{
    const {userid} = req.params
    res.json({"message":userid})
}

module.exports = logoutController;