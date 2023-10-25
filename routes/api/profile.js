const express = require('express');
const readProfileController = require('../../controllers/profile/readprofileController');
const updateProfileController = require('../../controllers/profile/updateProfileController');

const router = express.Router();


router.get('/', readProfileController);
router.put('/', updateProfileController);

module.exports = router