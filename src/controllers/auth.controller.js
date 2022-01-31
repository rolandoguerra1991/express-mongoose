const { authService } = require('../services');
const catchRequest = require('../utils/catchRequest');

const login = catchRequest(async (request, response) => {
  const { user, token } = await authService.autenticate(request.body);
  response.json({
    message: 'User logged in successfully',
    user,
    token,
  });
});

const register = catchRequest(async (request, response) => {
  const user = await authService.register(request.body);
  response.json({
    message: 'User created successfully',
    user,
  });
});

const logout = catchRequest(async (request, response) => {
  const { user } = request.user;
  await authService.logout(user._id);
  response.json({
    message: 'User logged out successfully',
  });
});

const sendResetPasswordEmail = catchRequest(async (request, response) => {
  const { email } = request.body;
  await authService.sendResetPasswordEmail(email);
  response.json({
    message: 'Reset password email sent successfully',
  });
});

const resetPassword = catchRequest(async (request, response) => {
  const { password } = request.body;
  const { authorization } = request.headers;
  await authService.resetPassword({ password, passwordResetToken: authorization.split(' ')[1] });
  response.json({
    message: 'Reset password',
  });
});

const sendVerificationEmail = catchRequest(async (request, response) => {
  await authService.sendVerificationEmail(request.body);
  response.json({
    message: 'Verification email sent successfully',
  });
});

const verifyEmail = catchRequest(async (request, response) => {
  await authService.verifyEmail(request.body);
  response.json({
    message: 'Email verified',
  });
});

module.exports = {
  login,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
