require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./config/credentials');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectDBCompass = require('./Test/dbConnectCompass');
const verifyJWT = require('./middlewares/verifyJWT');


const port = process.env.PORT || 3500;

// Connect to MongoDB
connectDBCompass();

//handle credential check before CORS
app.use(credentials)

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
//3rd middlwares for handle cookies
app.use(cookieParser());


//public routes
app.get('/' , (req,res)=>{
    res.json('Welcome to API RUSH excercise ')
})
app.use('/signup', require('./routes/signup.js'));
app.use('/login', require('./routes/login.js'));
app.use('/refresh' , require('./routes/refresh.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/forgotpassword' , require('./routes/forgotpassword.js'));





//private routes
app.use('/api/activity'  ,verifyJWT , require('./routes/api/activity.js'))
app.use('/api/dashboard',verifyJWT , require('./routes/api/dashboard.js'))                  
app.use('/api/profile',verifyJWT , require('./routes/api/profile.js'))


//route not found
app.use('/', require('./routes/notfound.js'));

//start server when connect DB success
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB firstime');
    app.listen(port , ()=>{console.log(`Server start at http://localhost:${port}`);
    })
})


