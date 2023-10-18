const mongoose = require('mongoose');

const urlDB = 'mongodb://127.0.0.1:27017/';

const connectDBCompass = async () => {
    try {
        await mongoose.connect(urlDB);
        console.log('connect db')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDBCompass;