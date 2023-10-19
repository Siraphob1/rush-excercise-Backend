require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDBCompass = require('./Test/dbConnectCompass');
const verifyJWT = require('./middlewares/verifyJWT');

const port = process.env.PORT || 3500;

// Connect to MongoDB
connectDBCompass();


//3rd middlewares for Cross-origin resource sharing website
app.use(cors(corsOptions));

//built-in middlewares for handle urlencoded form data
app.use(express.urlencoded({extended: false}));
//built-in middlewares for json
app.use(express.json());
//built-in middlewares for hide x-powered
app.disable('x-powered-by');

//3rd middlewares for secure setting http response header
app.use(helmet());





//routes
app.get('/' , (req,res)=>{
    res.json('Welcome to API RUSH excercise ')
})
app.use('/signup', require('./routes/signup.js'));
app.use('/login', require('./routes/login.js'));


//custom middlewares
app.use(verifyJWT)
app.use('/api/activity' , require('./routes/api/activity.js'))

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(port , ()=>{console.log(`Server start at http://localhost:${port}`);
    })
})


