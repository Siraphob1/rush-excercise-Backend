const express = require('express');
const logoutController = require('../controllers/logout/logoutController');


const router = express.Router();

router.get('/', logoutController);

module.exports = router