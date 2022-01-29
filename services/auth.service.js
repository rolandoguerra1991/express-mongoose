const userService = require('./user.service');
const sendEmail = require('../utils/emails');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const autenticate = async (payload) => {
  try {
    const { email, password } = payload;
    const user = await userService.findUser({ email });
    if (!user) {
      throw new Error('User not found');
    }
    await validateUserPassword(password, user);
    const token = await generateToken(user);
    await userService.updateUser({ _id: user._id }, { token });

    output = {
      user,
      token,
    };

    return output;
  } catch (error) {
    throw new Error(error);
  }
};

const register = async (payload) => {
  try {
    const user = await userService.createUser(payload);
    return user;
  } catch (error) {
    throw error;
  }
};

const validateUserPassword = async (password, user) => {
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw 'Invalid password';
    }
    return isValid;
  } catch (error) {
    throw error;
  }
};

const generateToken = async (user) => {
  try {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw error;
  }
};

const logout = async (id) => {
  try {
    await userService.removeToken(id);
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordEmail = async (email) => {
  try {
    const passwordResetToken = jwt.sign({ email }, process.env.JWT_SECRET);
    await userService.updateUser({ email }, { passwordResetToken });
    const emailData = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Reset Password',
      text: '',
      html: `<a href="${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}">Reset Password</a>`,
    };
    await sendEmail(emailData);
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (payload) => {
  try {
    const { password, passwordResetToken } = payload;
    await userService.changePassword({ passwordResetToken }, password);
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async (payload) => {
  try {
    const { email } = payload;
    if (await isVerified(email)) {
      throw 'Email already verified';
    }
    const emailVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
    await userService.updateUser({ email }, { emailVerificationToken });
    const emailData = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Email Verification',
      text: 'Email Verification',
      html: `<a href="${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}">Verify Email</a>`,
    };
    await sendEmail(emailData);
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (payload) => {
  const { email } = payload;
  try {
    await userService.updateUser({ email }, { emailVerificationToken: null, emailVerified: true });
  } catch (error) {
    throw error;
  }
};

const isVerified = async (email) => {
  try {
    const user = await userService.findUser({ email });
    return user.emailVerified;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  autenticate,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
