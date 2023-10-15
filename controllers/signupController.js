
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersdata = require('../model/users');

const saveData = (username , email ,password)=>{
    const countuser = usersdata.length > 0 ? usersdata.length+1 :1
    const newdata = {
        id:countuser ,
        username:username,    
        displayname:'none',    
        email: email, 
        password:password,
        isvarify:false,
        refreshToken:[],
        activities:[],
        age:0,
        caption:'none',
        tall:0,
        weight:0,     
    }
    usersdata.push(newdata)
}

const signupController = async (req , res) =>{
    const {username , email ,password} = req.body;
    if(!username || !email || !password) return res.status(400).json({"message":"username , email and password are required"});
    
    //check email duplicate in DB
    const duplicateEmail = usersdata.find(e=> e.email === email);
    if(duplicateEmail) return res.status(409).json({"message":'this email address has already been signup'});
    //check username duplicate in DB
    const duplicateUsername = usersdata.find(e => e.username === username);
    if(duplicateUsername) return res.status(409).json({"message":'this username has already been signup'});

    try {
        //encrypt password
        const hashPassword = await bcrypt.hash(password , 12);
        saveData(username , email , hashPassword);

        res.status(200).json({"message": `username:${username} signup success`});
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
    

    

    
}

module.exports = signupController;