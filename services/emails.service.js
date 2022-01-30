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
    await transport.sendMail(payload).catch(error => console.log(error.message));
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
