const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  passwordResetToken: {
    type: String,
    required: false
  },
  emailVerificationToken: {
    type: String,
    required: false
  },
  emailVerified: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true,
});

module.exports = userSchema;
