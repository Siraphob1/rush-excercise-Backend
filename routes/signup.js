const express = require('express');
const signupController = require('../controllers/signup/signupController');   
const verifyController = require('../controllers/signup/verifyController');

const router = express.Router();

router.post('/', signupController);
router.get('/verify', verifyController);

module.exports = router