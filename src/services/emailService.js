const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const config = require('../utils/config')
const path = require('path')

const sendEmail = async (payload) => {
  const options = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.join(__dirname, '../views/emails/'),
      defaultLayout: path.join(__dirname, '../views/emails/template'),
      partialsDir: path.join(__dirname, '../views/emails/')
    },
    viewPath: path.join(__dirname, '../views/emails'),
    extName: '.hbs'
  }
  const transport = nodemailer.createTransport({
    host: config.get('email.host'),
    port: config.get('email.port'),
    auth: {
      user: config.get('email.username'),
      pass: config.get('email.password')
    }
  })
  transport.use('compile', hbs(options))
  await transport.sendMail(payload).catch((err) => Promise.reject(err))
}

const sendResetPasswordEmail = async (email, passwordResetToken) => {
  const emailData = {
    from: config.get('email.from'),
    to: email,
    subject: 'Reset Password',
    template: 'forgot-password',
    context: { url: `${config.get('app.frontend')}/reset-password/${passwordResetToken}` }
  }
  await sendEmail(emailData).catch(err => Promise.reject(err))
}

const sendVerificationEmail = async (email, emailVerificationToken) => {
  const emailData = {
    from: config.get('email.from'),
    to: email,
    subject: 'Email Verification',
    template: 'verify-email',
    context: { url: `${config.get('app.frontend')}/verify-email/${emailVerificationToken}` }
  }
  await sendEmail(emailData).catch(err => Promise.reject(err))
}

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail
}
