const express = require('express');
const router = express.Router();

router.all('/*' , (req , res)=>{
    //not found this route
    res.sendStatus(404);    
})

module.exports = router;