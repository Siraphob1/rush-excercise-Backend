require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3500


app.get('/' , (req,res)=>{
    res.send('Welcome to API RUSH excercise ')
})




app.listen(port , ()=>{
    console.log(`Server start at http://localhost:${port}`)
})

