const express = require('express');
const {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
} = require('../controllers/authController');
const { authenticated } = require('../middlewares');
const {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
} = require('../validations/auth');

const router = express.Router();

router
  .post('/login', [loginValidation], login)
  .post('/register', [registerValidation], register)
  .post('/forgot-password', forgotPassword)
  .post('/reset-password', [resetPasswordValidation], resetPassword);

router.use(authenticated);

router
  .post('/logout', logout)
  .post('/send-verification-email', [sendVerificationEmailValidation], sendVerificationEmail)
  .post('/verify-email', [verifyEmailValidation], verifyEmail);

module.exports = router;
