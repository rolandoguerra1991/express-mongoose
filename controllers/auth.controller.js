const { authService } = require('../services');

const login = async (request, response) => {
  try {
    const { user, token } = await authService.autenticate(request.body);
    response.json({
      message: 'User logged in successfully',
      user,
      token,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const register = async (request, response) => {
  try {
    const user = await authService.register(request.body);
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
    await authService.logout(user.id);
    response.json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const sendResetPasswordEmail = async (request, response) => {
  try {
    const { email } = request.body;
    await authService.sendResetPasswordEmail(email);
    response.json({
      message: 'Reset password email sent successfully',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const resetPassword = async (request, response) => {
  try {
    await authService.resetPassword(request.body);
    response.json({
      message: 'Reset password',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const sendVerificationEmail = async (request, response) => {
  try {
    await authService.sendVerificationEmail(request.body);
    response.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (request, response) => {
  try {
    await authService.verifyEmail(request.body);
    response.json({
      message: 'Email verified',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
