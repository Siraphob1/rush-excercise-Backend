require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
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
//3rd middlwares for cookies
app.use(cookieParser());



//routes public
app.get('/' , (req,res)=>{
    res.json('Welcome to API RUSH excercise ')
})
app.use('/signup', require('./routes/signup.js'));
app.use('/login', require('./routes/login.js'));
app.use('/refresh' , require('./routes/refresh.js'));
app.use('/logout', require('./routes/logout.js'));

//custom middlewares for check JWT 
app.use(verifyJWT)

//routes private
app.use('/api/activity' , require('./routes/api/activity.js'))

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(port , ()=>{console.log(`Server start at http://localhost:${port}`);
    })
})


