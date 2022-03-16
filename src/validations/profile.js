const { body } = require('express-validator')

const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required')
    .bail(),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .bail()
]

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
    .bail()
]

module.exports = {
  updatePasswordValidation,
  updateProfileValidation
}
