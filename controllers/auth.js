const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    response.json({
      message: 'User logged in successfully',
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const register = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    response.json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const logout = async (request, response) => {
  try {
    const { user } = request;
    await User.findByIdAndUpdate(user.id, { token: null }).exec();
    response.json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const sendResetPasswordEmail = async (request, response) => {};
const resetPassword = async (request, response) => {};
const sendVerificationEmail = async (request, response) => {};
const verifyEmail = async (request, response) => {};

module.exports = {
  login,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
