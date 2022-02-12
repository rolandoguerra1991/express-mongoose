const { body } = require('express-validator');

const { emailIsTaken, isEmailVerified, alreadyLoggedIn, validateToken } = require('./custom');

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .bail()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .custom(alreadyLoggedIn)
    .bail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .bail()
    .notEmpty()
    .withMessage('Password is required')
    .bail(),
];

const registerValidation = [
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
    .custom(emailIsTaken)
    .bail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .bail(),
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .bail()
    .notEmpty()
    .withMessage('Password is required')
    .bail(),
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .bail()
    .custom(token => validateToken({ passwordResetToken: token }))
    .bail(),
];

const sendVerificationEmailValidation = [
  body('email')
    .custom(isEmailVerified)
    .bail(),
  ];

const verifyEmailValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .bail()
    .custom(token => validateToken({ emailVerificationToken: token }))
    .bail(),
];

module.exports = {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
};
