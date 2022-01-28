const userService = require('./user.service');
const sendEmail = require('../utils/emails');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
};

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

const logout = async (id) => {
  try {
    await userService.removeToken(id);
  } catch (error) {
    throw new Error(error);
  }
};

const sendResetPasswordEmail = async (email) => {
  try {
    const passwordResetToken = jwt.sign({ email }, process.env.JWT_SECRET);
    await userService.updateUserByField('email', email, { passwordResetToken });
    const emailData = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Reset Password',
      text: '',
      html: `<a href="${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}">Reset Password</a>`,
    };
    await sendEmail(emailData);
  } catch (error) {
    throw new Error(error);
  }
};

const resetPassword = async (payload) => {
  try {
    const { email, password } = payload;
    await userService.changePassword('email', email, password);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  autenticate,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
};
