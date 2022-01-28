const nodemailer = require('nodemailer');
const { transportSettings } = require('../config');

const sendEmail = async (payload) => {
  try {
    transport = nodemailer.createTransport(transportSettings);
    transport.sendMail(payload);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
