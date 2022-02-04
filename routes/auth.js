const express = require('express');
const router = express.Router();

const {
  login,
  register,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  logout,
} = require('../controllers/authController');

const middlewares = require('../middlewares');

const {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
} = require('../validations/auth');

router.post('/login', loginValidation, login);

router.post('/register', registerValidation, register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);

router.use(middlewares.authenticated);

router.post('/logout', logout);
router.post('/send-verification-email', sendVerificationEmailValidation, sendVerificationEmail);
router.post('/verify-email', verifyEmailValidation, verifyEmail);

module.exports = router;
