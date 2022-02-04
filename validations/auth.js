const { body } = require('express-validator');

const { emailIsTaken, isEmailVerified, alreadyLoggedIn, validateToken } = require('./custom');

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .notEmpty()
    .withMessage('Email is required')
    .custom((email) => alreadyLoggedIn(email)),
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
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .custom((token) => validateToken({ passwordResetToken: token })),
];

const sendVerificationEmailValidation = [body('email').custom((email) => isEmailVerified(email))];

const verifyEmailValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .custom((token) => validateToken({ emailVerificationToken: token })),
];

module.exports = {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
};
