const userService = require('./userService');
const tokenService = require('./tokenService');
const emailService = require('./emailService');

const bcrypt = require('bcrypt');

const autenticate = async (payload) => {
  try {
    const { email, password } = payload;
    const user = await userService.findUser({ email });
    await validateUserPassword(password, user);
    const authToken = await tokenService.generateToken({ id: user._id.toString(), role: user.role });
    await userService.updateUser({ _id: user._id }, { authToken });

    const output = {
      user,
      authToken,
    };
    return output;
  } catch (err) {
    throw err;
  }
};

const register = async (payload) => {
  try {
    const user = await userService.createUser(payload);
    return user;
  } catch (err) {
    throw err;
  }
};

const validateUserPassword = async (password, user) => {
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw 'Invalid password';
    }
    return isValid;
  } catch (err) {
    throw err;
  }
};

const logout = async (id) => {
  try {
    await userService.removeToken(id);
  } catch (err) {
    throw err;
  }
};

const sendResetPasswordEmail = async (email) => {
  try {
    const passwordResetToken = await tokenService.generateToken({ email });
    await userService.updateUser({ email }, { passwordResetToken });
    await emailService.sendResetPasswordEmail(email, passwordResetToken);
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (payload) => {
  try {
    const { passwordResetToken, password } = payload;
    await userService.changePassword({ passwordResetToken }, password);
  } catch (err) {
    throw err;
  }
};

const sendVerificationEmail = async (email) => {
  try {
    const emailVerificationToken = await tokenService.generateToken({ email });
    await userService.updateUser({ email }, { emailVerificationToken });
    await emailService.sendVerificationEmail(email, emailVerificationToken);
  } catch (err) {
    throw err;
  }
};

const verifyEmail = async (token) => {
  try {
    await userService.updateUser({ emailVerificationToken: token }, { emailVerificationToken: null, emailVerified: true });
  } catch (err) {
    throw err;
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
