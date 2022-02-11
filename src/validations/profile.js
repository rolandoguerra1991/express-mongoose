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

module.exports = {
  changePasswordValidation,
  updateProfileValidation
}
