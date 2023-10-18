const mongoose = require('mongoose');

// must set url mongoDB Atlas
const urlDB = '';

const connectDBAtlas = async () => {
    try {
        await mongoose.connect(urlDB ,{
            useUnifiedTopology: true ,  
            useNewUrlParser: true
        });
        console.log('connect db success')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDBAtlas;