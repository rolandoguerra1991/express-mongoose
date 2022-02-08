const { body } = require('express-validator');

const { emailIsTaken, isEmailVerified, alreadyLoggedIn, validateToken } = require('./custom');

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .notEmpty()
    .withMessage('Email is required')
    .custom(alreadyLoggedIn),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
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
    .notEmpty()
    .withMessage('Password is required'),
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .custom(token => validateToken({ passwordResetToken: token })),
];

const sendVerificationEmailValidation = [
  body('email')
    .custom(isEmailVerified),
  ];

const verifyEmailValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .custom(token => validateToken({ emailVerificationToken: token })),
];

module.exports = {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
};
