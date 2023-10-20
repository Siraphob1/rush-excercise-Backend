const express = require('express');
const forgotPWDController = require('../controllers/forgotpassword/forgotPWDController');
const resetPWDController = require('../controllers/forgotpassword/resetPWDController');


const router = express.Router();

router.post('/', forgotPWDController);
router.put('/reset', resetPWDController);

module.exports = router