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

router.post('/login', [loginValidation], login);
router.post('/register', [registerValidation], register);
router.post('/logout', [authenticated], logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', [resetPasswordValidation], resetPassword);
router.post('/send-verification-email', [authenticated, sendVerificationEmailValidation], sendVerificationEmail);
router.post('/verify-email', [authenticated, verifyEmailValidation], verifyEmail);

module.exports = router;
