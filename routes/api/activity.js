const express = require('express');
const router = express.Router();

const createActivityController = require('../../controllers/activity/createActivityController');
const readAllActivitiesController = require('../../controllers/activity/readAllActivityController.js');
const updateActivityController = require('../../controllers/activity/updateActivityController');
const deleteActivityController = require('../../controllers/activity/deleteActivityController');


//read activities
router.get('/',readAllActivitiesController)

//create activity
router.post('/', createActivityController);

//update activity
router.put('/', updateActivityController);

//delete activity
router.delete('/', deleteActivityController)


module.exports = router;