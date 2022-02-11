const { body, check } = require('express-validator');

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required')
    .bail(),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required'),
];

const updateProfileValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is invalid')
    .bail(),
];

const updateProfileImageValidation = [
  check('profileImage')
    .notEmpty()
    .withMessage('Profile image is required')
    .bail()
    .isMimeType('image/jpeg')
    .withMessage('Profile image must be a jpeg image')
    .bail(),
];

module.exports = {
  updatePasswordValidation,
  updateProfileValidation,
  updateProfileImageValidation
}
