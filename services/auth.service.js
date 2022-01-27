const userService = require('./user.service');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { transportSettings } = require('../config');

const autenticate = async (payload) => {
  const { email, password } = payload;
  const user = await userService.findUserByField('email', email);
  await validateUserPassword(password, user);
  const token = await generateToken(user);
  await userService.updateUserByField('_id', user._id, { token });

  output = {
    user,
    token,
  };

  return output;
};

const register = async (payload) => {
  const user = await userService.createUser(payload);
  return user;
}

const validateUserPassword = async (password, user) => {
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  return isValid;
};

const generateToken = async (user) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  autenticate,
  register,
};
