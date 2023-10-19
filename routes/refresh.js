const express = require('express');
const refreshTokenController = require('../controllers/refresh/refreshtokenController');
const router = express.Router();

router.get('/', refreshTokenController);

module.exports = router