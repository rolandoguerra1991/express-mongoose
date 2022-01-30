const authenticated = require('./authenticated.middleware');
const files = require('./files.middleware');
const passwordResetToken = require('./password-reset-token.middleware');
const verifyEmailToken = require('./verify-email-token.middleware');
const guest = require('./guest.middleware');

module.exports = {
  authenticated,
  passwordResetToken,
  verifyEmailToken,
  files,
  guest,
};
