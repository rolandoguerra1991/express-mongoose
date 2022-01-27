const authenticated = require('./authenticated');
const uploadFiles = require('./uploadFiles');
const passwordResetToken = require('./passwordResetToken');
const verifyEmailToken = require('./verifyEmailToken');

module.exports = {
  authenticated,
  passwordResetToken,
  verifyEmailToken,
  uploadFiles
}
