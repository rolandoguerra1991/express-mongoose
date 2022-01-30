const { body } = require('express-validator');

const { emailIsTaken } = require('./custom.validation');

const loginValidation = [
  body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
];

const registerValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .notEmpty()
    .withMessage('Email is required')
    .custom((email) => emailIsTaken(email)),
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
];

module.exports = {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
};
