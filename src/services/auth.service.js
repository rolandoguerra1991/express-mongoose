const userService = require('./user.service');
const tokenService = require('./token.service');
const emailsService = require('./emails.service');

const bcrypt = require('bcrypt');

const autenticate = async (payload) => {
  try {
    const { email, password } = payload;
    const user = await verifyIfExistUser(email);
    await validateUserPassword(password, user);
    const token = await tokenService.generateToken(user._id);
    await userService.updateUser({ _id: user._id }, { token });

    output = {
      user,
      token,
    };

    return output;
  } catch (error) {
    throw error;
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

const logout = async (id) => {
  try {
    await userService.removeToken(id);
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordEmail = async (email) => {
  try {
    const passwordResetToken = tokenService.generateToken({ email });
    await userService.updateUser({ email }, { passwordResetToken });
    await emailsService.sendResetPasswordEmail();
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
    const emailVerificationToken = tokenService.generateToken({ email });
    await userService.updateUser({ email }, { emailVerificationToken });
    await emailsService.sendVerificationEmail();
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

const verifyIfExistUser = async (email) => {
  const user = await userService.findUser({ email });
  if (!user) {
    throw 'User not found';
  }
  return user;
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
