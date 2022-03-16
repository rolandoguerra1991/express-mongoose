const User = require('../models/user')
const bcrypt = require('bcrypt')

const createUser = async (payload) => {
  const { name, email, password } = payload
  const hashedPassword = await generateHashedPassword(password)
  const user = await User.create({ name, email, password: hashedPassword })
  return user
}

const findUser = async (query) => {
  const user = await User.findOne(query).exec()
  return user
}

const updateUser = async (query, update) => {
  const user = await User.findOneAndUpdate(query, update)
  return user
}

const generateHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

const removeAuthToken = async (id) => {
  await User.findByIdAndUpdate(id, { authToken: null })
}

const removePasswordResetToken = async (id) => {
  await User.findByIdAndUpdate(id, { passwordResetToken: null })
}

const removeEmailVerificationToken = async (id) => {
  await User.findByIdAndUpdate(id, { emailVerificationToken: null })
}

const changePassword = async (query, password) => {
  const hashedPassword = await generateHashedPassword(password)
  await updateUser(query, { password: hashedPassword })
}

const query = async (payload) => {
  const { name, email, page = 1, limit = 5 } = payload
  const query = {}
  if (name) {
    query.name = { $regex: name, $options: 'i' }
  }
  if (email) {
    query.email = { $regex: email, $options: 'i' }
  }
  const user = await User.paginate(query, { page, limit })
  return user
}

const deleteUser = async (payload) => {
  const { _id, authUserId } = payload
  if (_id === authUserId) {
    return new Error('You cannot delete yourself')
  }
  await User.findOneAndDelete({ _id })
}

const findUserById = async (id) => {
  const user = await User.findById(id).exec()
  return user
}

module.exports = {
  createUser,
  findUser,
  updateUser,
  removeAuthToken,
  changePassword,
  query,
  deleteUser,
  findUserById,
  removePasswordResetToken,
  removeEmailVerificationToken
}
