const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
  {
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
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
    emailVerificationToken: {
      type: String,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

module.exports = model('User', userSchema);
