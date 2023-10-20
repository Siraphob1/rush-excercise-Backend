const express = require('express');
const activityController = require('../../controllers/activity/activityController');
const router = express.Router();

// create 
router.get('/:userid', activityController);
router.put('/:userid', activityController);
router.post('/:userid', activityController);
router.delete('/:userid', activityController);


module.exports = router;