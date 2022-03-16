const userService = require('./userService')
const tokenService = require('./tokenService')
const emailService = require('./emailService')
const bcrypt = require('bcrypt')

const authenticate = async (payload) => {
  const { email, password } = payload
  const user = await userService.findUser({ email })
  await validateUserPassword(password, user)
  const authToken = await tokenService.generateToken({ id: user._id.toString(), role: user.role })
  await userService.updateUser({ _id: user._id }, { authToken })
  const output = {
    user,
    authToken
  }
  return output
}

const register = async (payload) => {
  const user = await userService.createUser(payload)
  return user
}

const validateUserPassword = async (password, user) => {
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return new Error('Invalid password')
  }
  return isValid
}

const logout = async (id) => {
  await userService.removeAuthToken(id)
}

const sendResetPasswordEmail = async (email) => {
  const passwordResetToken = await tokenService.generateToken({ email })
  await emailService.sendResetPasswordEmail(email, passwordResetToken)
  await userService.updateUser({ email }, { passwordResetToken })
}

const resetPassword = async (payload) => {
  const { passwordResetToken, password, id } = payload
  await userService.changePassword({ passwordResetToken }, password)
  await userService.removePasswordResetToken(id)
}

const sendVerificationEmail = async (email) => {
  const emailVerificationToken = await tokenService.generateToken({ email })
  await userService.updateUser({ email }, { emailVerificationToken })
  await emailService.sendVerificationEmail(email, emailVerificationToken)
}

const verifyEmail = async (token) => {
  await userService.updateUser({ emailVerificationToken: token }, { emailVerificationToken: null, emailVerified: true })
}

module.exports = {
  authenticate,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  validateUserPassword
}
