const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String, 
        require:true
    },
    email:{
        type: String, 
        require:true
    },
    password:{
        type: String, 
        require:true
    },
    createDate:{
        type: String, 
        require:true
    },
    userID:{
        type: String,
        default: ''
    },
    isVerify:{
        type: Boolean, 
        default:false
    },
    displayName:{
        type: String,
        default:'default'
    },        
    age:{
        type: Number,
        default: 18
    },
    caption:{
        type: String,
        default: 'default caption'
    },
    height:{
        type: Number,
        default: 18
    },
    weight:{
        type: Number,
        default: 18
    },
    imageURL:{
        type: String,
        default: 'default'
    },
    refreshToken:{
        type: String,
        default: 'default'
    }
});

// export model
// User = collection name
// userSchema = blueprint
const userModel = mongoose.model('User', userSchema);  
module.exports = userModel;