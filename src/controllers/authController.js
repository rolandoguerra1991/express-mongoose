const { authService } = require('../services')
const { validationResult } = require('express-validator')

const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { user, authToken } = await authService.authenticate(req.body)

  res.json({
    message: 'User logged in successfully',
    user,
    authToken
  })
}

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const user = await authService.register(req.body)
  res.json({
    message: 'User created successfully',
    user
  })
}

const logout = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { id } = req.user
  await authService.logout(id)
  res.json({
    message: 'User logged out successfully'
  })
}

const forgotPassword = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { email } = req.body
  await authService.sendResetPasswordEmail(email)
  res.json({
    message: 'Reset password email sent successfully'
  })
}

const resetPassword = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { password, token } = req.body
  const { id } = req.user
  await authService.resetPassword({ password, passwordResetToken: token, id })
  res.json({
    message: 'Reset password'
  })
}

const sendVerificationEmail = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { email } = req.body
  await authService.sendVerificationEmail(email)
  res.json({
    message: 'Verification email sent successfully'
  })
}

const verifyEmail = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  const { token } = req.body
  await authService.verifyEmail(token)
  res.json({
    message: 'Email verified'
  })
}

module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
}
