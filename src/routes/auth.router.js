const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticated, passwordResetToken, verifyEmailToken, guest } = require('../middlewares');
const { loginValidation, registerValidation, resetPasswordValidation } = require('../validations/auth.validation');

const router = express.Router();

router.post('/login', [guest, loginValidation], authController.login);
router.post('/register', [guest, registerValidation], authController.register);
router.post('/logout', [authenticated], authController.logout);
router.post('/send-reset-password-email', [guest], authController.sendResetPasswordEmail);
router.post('/reset-password', [passwordResetToken, resetPasswordValidation], authController.resetPassword);
router.post('/send-verification-email', [authenticated], authController.sendVerificationEmail);
router.post('/verify-email', [authenticated, verifyEmailToken], authController.verifyEmail);

module.exports = router;
