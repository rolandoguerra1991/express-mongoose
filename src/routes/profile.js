const express = require('express');
const router = express.Router();

const uploadFile = require('../utils/uploadFile');

const { authenticated } = require('../middlewares');

const { updatePassword, updateProfile, updateProfileImage } = require('../controllers/profileController');

router.use(authenticated);

router.post('/update-password', updatePassword);
router.post('/update-profile', updateProfile);
router.post('/update-profile-image', [uploadFile.single('profileImage')], updateProfileImage);

module.exports = router;
