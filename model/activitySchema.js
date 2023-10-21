const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userID:{
        type: String,
        require:true
    },
    name:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    type:{
        type: String,
        require:true
    },
    startDate:{
        type: String,
        require:true
    },
    endDate:{
        type: String,
        require:true
    },
    createDate:{
        type: String,
        require:true
    },
    status:{
        type: String,
        default: 'inprogress'
    }
});

const activityModel = mongoose.model('activityList', activitySchema);
module.exports = activityModel;