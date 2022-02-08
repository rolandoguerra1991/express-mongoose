const { authService } = require('../services');
const catchRequest = require('../utils/catchRequest');

const login = catchRequest(async (req, res) => {
  const { user, token } = await authService.autenticate(req.body);
  res.json({
    message: 'User logged in successfully',
    user,
    token,
  });
});

const register = catchRequest(async (req, res) => {
  const user = await authService.register(req.body);
  res.json({
    message: 'User created successfully',
    user,
  });
});

const logout = catchRequest(async (req, res) => {
  const { id } = req.user;
  await authService.logout(id);
  res.json({
    message: 'User logged out successfully',
  });
});

const forgotPassword = catchRequest(async (req, res) => {
  const { email } = req.body;
  await authService.sendResetPasswordEmail(email);
  res.json({
    message: 'Reset password email sent successfully',
  });
});

const resetPassword = catchRequest(async (req, res) => {
  const { password, token } = req.body;
  await authService.resetPassword({ password, passwordResetToken: token });
  res.json({
    message: 'Reset password',
  });
});

const sendVerificationEmail = catchRequest(async (req, res) => {
  const { email } = req.body;
  await authService.sendVerificationEmail(email);
  res.json({
    message: 'Verification email sent successfully',
  });
});

const verifyEmail = catchRequest(async (req, res) => {
  const { token } = req.body;
  await authService.verifyEmail(token);
  res.json({
    message: 'Email verified',
  });
});

module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
