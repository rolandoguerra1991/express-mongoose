const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (payload) => {
  try {
    const { name, email, password } = payload;
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  } catch (error) {
    throw error;
  }
};

const findUser = async (query) => {
  try {
    const user = await User.findOne(query).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (query, update) => {
  try {
    const user = await User.findOneAndUpdate(query, update);
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
    throw error;
  }
};

const removeToken = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { token: null });
  } catch (error) {
    throw error;
  }
};

const changePassword = async (query, password) => {
  try {
    const hashedPassword = await generateHashedPassword(password);
    await updateUser(query, { password: hashedPassword, passwordResetToken: null });
  } catch (error) {
    throw error;
  }
};

const query = async (payload) => {
  try {
    const { name, email, page = 1, limit = 5 } = payload;
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }
    const user = await User.paginate(query, { page, limit });
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (payload) => {
  try {
    const { _id, authUserId } = payload;
    if (_id === authUserId) {
      throw 'You cannot delete yourself';
    }
    await User.findOneAndDelete({ _id });
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
  removeToken,
  changePassword,
  query,
  deleteUser,
  findUserById,
};
