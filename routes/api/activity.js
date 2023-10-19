const express = require('express');
const userController = require('../../controllers/user/userController');
const router = express.Router();

router.get('/:userid', userController);


module.exports = router;