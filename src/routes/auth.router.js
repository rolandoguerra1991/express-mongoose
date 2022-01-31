const express = require('express');
const {
  login,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
} = require('../controllers/auth.controller');
const { authenticated, passwordResetToken, verifyEmailToken, guest } = require('../middlewares');
const { loginValidation, registerValidation, resetPasswordValidation } = require('../validations/auth.validation');

const router = express.Router();

router.post('/login', [guest, loginValidation], login);
router.post('/register', [guest, registerValidation], register);
router.post('/logout', [authenticated], logout);
router.post('/send-reset-password-email', [guest], sendResetPasswordEmail);
router.post('/reset-password/:token', [passwordResetToken, resetPasswordValidation], resetPassword);
router.post('/send-verification-email', [authenticated], sendVerificationEmail);
router.post('/verify-email/:token', [authenticated, verifyEmailToken], verifyEmail);

module.exports = router;
