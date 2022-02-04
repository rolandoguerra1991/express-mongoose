const express = require('express');

const authController = require('../controllers/authController');
const { authenticated } = require('../middlewares');
const { loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendVerificationEmailValidation,
  verifyEmailValidation,
} = require('../validations/auth');

const router = express.Router();

router
  .post('/login', [loginValidation], authController.login)
  .post('/register', [registerValidation], authController.register)
  .post('/forgot-password', authController.forgotPassword)
  .post('/reset-password', [resetPasswordValidation], authController.resetPassword);

router.use(authenticated);

router
  .post('/logout', authController.logout)
  .post('/send-verification-email', [sendVerificationEmailValidation], authController.sendVerificationEmail)
  .post('/verify-email', [verifyEmailValidation], authController.verifyEmail);

module.exports = router;
