const express = require('express');
const signupController = require('../controllers/signup/signupController');   
const verifyController = require('../controllers/signup/verifyController');

const router = express.Router();

//signup/
router.post('/', signupController);
//signup/verify
router.get('/verify', verifyController);

module.exports = router