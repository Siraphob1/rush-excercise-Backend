const express = require('express');

const createActivityController = require('../../controllers/activity/createActivityController');
const readAllActivitiesController = require('../../controllers/activity/readAllActivityController.js');

const router = express.Router();

//read activities
router.get('/:userID',readAllActivitiesController)

// create activity
router.post('/:userID', createActivityController);



module.exports = router;