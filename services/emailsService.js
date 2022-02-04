const nodemailer = require('nodemailer');

const sendEmail = async (payload) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    await transport.sendMail(payload).catch((error) => console.log(error.message));
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordEmail = async (email, token) => {
  const emailData = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject: 'Reset Password',
    text: '',
    html: `<a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>`,
  };
  await sendEmail(emailData);
};

const sendVerificationEmail = async (email, token) => {
  const emailData = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject: 'Email Verification',
    text: 'Email Verification',
    html: `<a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`,
  };
  await sendEmail(emailData);
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
};
