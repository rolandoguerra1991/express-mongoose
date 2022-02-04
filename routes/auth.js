const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const middlewares = require('../middlewares');
const validations = require('../validations');

router.post('/login', validations.auth.loginValidation, authController.login);
router.post('/register', validations.auth.registerValidation, authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', validations.auth.resetPasswordValidation, authController.resetPassword);

router.use(middlewares.authenticated);

router.post('/logout', authController.logout);
router.post('/send-verification-email', validations.auth.sendVerificationEmailValidation, authController.sendVerificationEmail);
router.post('/verify-email', validations.auth.verifyEmailValidation, authController.verifyEmail);

module.exports = router;
