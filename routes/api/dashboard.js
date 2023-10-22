const express = require('express');
const dashboardController = require('../../controllers/dashboard/dashboardController');

const router = express.Router();

router.get('/:userID', dashboardController);


module.exports = router;