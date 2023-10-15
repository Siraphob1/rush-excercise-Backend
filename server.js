require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const helmet = require('helmet');
const port = process.env.PORT || 3500;

//3rd middlewares for Cross-origin resource sharing website
app.use(cors());


//built-in middlewares 
//for handle urlencoded form data
app.use(express.urlencoded({extended: false}));
//for json
app.use(express.json());
//for hide x-powered
app.disable('x-powered-by');


//3rd middlewares for secure setting http response header
app.use(helmet());

//custom middlewares



app.get('/' , (req,res)=>{
    res.json('Welcome to API RUSH excercise ')
})




app.listen(port , ()=>{
    console.log(`Server start at http://localhost:${port}`)
})

