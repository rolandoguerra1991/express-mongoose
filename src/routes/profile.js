const express = require('express');
const router = express.Router();

const uploadFile = require('../utils/uploadFile');

const { authenticated } = require('../middlewares');

const { updatePassword, updateProfile, updateProfileImage } = require('../controllers/profileController');

const {
  updatePasswordValidation,
  updateProfileValidation,
} = require('../validations/profile');

router.use(authenticated);

router.post('/update-password', [updatePasswordValidation], updatePassword);
router.post('/update-profile', [updateProfileValidation], updateProfile);
router.post(
  '/update-profile-image',
  [uploadFile('profile-images').single('profileImage')],
  updateProfileImage
);

module.exports = router;
