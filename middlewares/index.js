const authenticated = require('./authenticated.middleware');
const uploadFiles = require('./upload-files.middleware');
const passwordResetToken = require('./password-reset-token.middleware');
const verifyEmailToken = require('./verify-email-token.middleware');

module.exports = {
  authenticated,
  passwordResetToken,
  verifyEmailToken,
  uploadFiles
}
