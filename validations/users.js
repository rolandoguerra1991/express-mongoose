const { body, param } = require('express-validator');
const { emailIsTaken, validateID } = require('./custom');

const createUserValidate = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .bail()
    .notEmpty()
    .withMessage('Password is required')
    .bail(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail(),
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .bail()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .custom(emailIsTaken)
    .bail(),
];

const updateUserValidate = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .bail()
    .custom(validateID)
    .bail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .bail()
    .notEmpty()
    .withMessage('Password is required')
    .bail(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail(),
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .bail()
    .notEmpty()
    .withMessage('Email is required')
    .bail(),
];

const deleteUserValidate = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .bail()
    .custom(validateID)
    .bail(),
];

module.exports = {
  createUserValidate,
  updateUserValidate,
  deleteUserValidate,
};
