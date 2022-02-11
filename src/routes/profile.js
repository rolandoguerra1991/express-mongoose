const express = require('express');
const router = express.Router();

const uploadFile = require('../utils/uploadFile');

const { authenticated } = require('../middlewares');

const { updatePassword, updateProfile, updateProfileImage } = require('../controllers/profileController');

const {
  changePasswordValidation,
  updateProfileValidation,
  updateProfileImageValidation,
} = require('../validations/profile');

router.use(authenticated);

router.post('/update-password', [changePasswordValidation], updatePassword);
router.post('/update-profile', [updateProfileValidation], updateProfile);
router.post(
  '/update-profile-image',
  [updateProfileImageValidation, uploadFile('profile-images').single('profileImage')],
  updateProfileImage
);

module.exports = router;
