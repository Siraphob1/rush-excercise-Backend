const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String, 
        require:true
    },
    userid:{
        type: String,
        default: ''
    },
    displayname:{
        type: String,
        default:'default'
    },
    email:{
        type: String, 
        require:true
    },
    password:{
        type: String, 
        require:true
    },
    isverify:{
        type: Boolean, 
        default:false
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
    refreshToken:{
        type: String,
        default: ''
    },
    listActivities:{
        type: Array,
        default: []
    }
});

// export model
// User = collection name
// userSchema = blueprint
const userModel = mongoose.model('User', userSchema);  
module.exports = userModel;