const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authenticated } = require('../middlewares');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authenticated, authController.logout);
router.post('/send-reset-password-email', authController.sendResetPasswordEmail);
router.post('/reset-password', authController.resetPassword);
router.post('/send-verification-email', authenticated, authController.sendVerificationEmail);
router.post('/verify-email', authenticated, authController.verifyEmail);

module.exports = router;
