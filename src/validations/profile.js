const { body } = require('express-validator');

const changePasswordValidation = [
  body('currentPassword')
    .isEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isEmpty()
    .withMessage('New password is required'),
];

const updateProfileValidation = [
  body('name')
    .isEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
];

const updateProfileImageValidation = [
  body('profileImage')
    .isEmpty()
    .withMessage('Profile image is required')
    .isMimeType('image/jpeg')
    .withMessage('Profile image must be a jpeg image'),
];

module.exports = {
  changePasswordValidation,
  updateProfileValidation,
  updateProfileImageValidation
}
