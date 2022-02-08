const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (payload) => {
  try {
    const { name, email, password } = payload;
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  } catch (err) {
    throw err;
  }
};

const findUser = async (query) => {
  try {
    const user = await User.findOne(query).exec();
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (query, update) => {
  try {
    const user = await User.findOneAndUpdate(query, update);
    return user;
  } catch (err) {
    throw err;
  }
};

const generateHashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

const removeToken = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { authToken: null });
  } catch (err) {
    throw err;
  }
};

const changePassword = async (query, password) => {
  try {
    const hashedPassword = await generateHashedPassword(password);
    await updateUser(query, { password: hashedPassword, passwordResetToken: null });
  } catch (err) {
    throw err;
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
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (payload) => {
  try {
    const { _id, authUserId } = payload;
    if (_id === authUserId) {
      throw 'You cannot delete yourself';
    }
    await User.findOneAndDelete({ _id });
  } catch (err) {
    throw err;
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (err) {
    throw err;
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
