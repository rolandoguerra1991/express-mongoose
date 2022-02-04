const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async (payload) => {
  try {
    const transport = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.username,
        pass: config.email.password,
      },
    });
    await transport.sendMail(payload).catch((error) => console.log(error.message));
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordEmail = async (email, token) => {
  const emailData = {
    from: config.email.from,
    to: email,
    subject: 'Reset Password',
    text: '',
    html: `<a href="${config.app.frontend}/reset-password/${token}">Reset Password</a>`,
  };
  await sendEmail(emailData);
};

const sendVerificationEmail = async (email, token) => {
  const emailData = {
    from: config.email.from,
    to: email,
    subject: 'Email Verification',
    text: 'Email Verification',
    html: `<a href="${config.app.frontend}/verify-email/${token}">Verify Email</a>`,
  };
  await sendEmail(emailData);
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
};
