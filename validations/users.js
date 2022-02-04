const { body, param } = require('express-validator');
const { emailIsTaken, validateID } = require('./custom');

const createUserValidate = [
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

const updateUserValidate = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .custom((id) => validateID(id)),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .notEmpty()
    .withMessage('Email is required'),
];

const deleteUserValidate = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .custom((id) => validateID(id)),
];

module.exports = {
  createUserValidate,
  updateUserValidate,
  deleteUserValidate,
};
