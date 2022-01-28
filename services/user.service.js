const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async (payload) => {
  try {
    const { name, email, password } = payload;
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByField = async (field, value) => {
  try {
    const user = await User.findOne({ [field]: value }).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserByField = async (field, value, payload) => {
  try {
    const user = await User.updateOne({ [field]: value }, payload).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

const generateHashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const removeToken = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { token: null }).exec();
  } catch (error) {
    throw new Error(error);
  }
};

const changePassword = async (field, value, password) => {
  try {
    const hashedPassword = await generateHashedPassword(password);
    await updateUserByField(field, value, { password: hashedPassword, passwordResetToken: null });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  findUserByField,
  updateUserByField,
  removeToken,
  changePassword,
};
