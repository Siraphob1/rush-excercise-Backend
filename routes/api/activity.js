const express = require('express');
const router = express.Router();

const createActivityController = require('../../controllers/activity/createActivityController');
const readAllActivitiesController = require('../../controllers/activity/readAllActivityController.js');
const updateActivityController = require('../../controllers/activity/updateActivityController');
const deleteActivityController = require('../../controllers/activity/deleteActivityController');


//read activities
router.get('/:userID',readAllActivitiesController)

//create activity
router.post('/:userID', createActivityController);

//update activity
router.put('/:userID', updateActivityController);

//delete activity
router.delete('/:userID', deleteActivityController)


module.exports = router;