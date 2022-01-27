const { authService } = require('../services');

const login = async (request, response) => {
  try {
    const { user, token} = await authService.autenticate(request.body);
    response.json({
      message: 'User logged in successfully',
      user,
      token
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const register = async (request, response) => {
  try {
    const user = await authService.register(request.body);
    response.json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const logout = async (request, response) => {
  try {
    const { user } = request;
    await User.findByIdAndUpdate(user.id, { token: null }).exec();
    response.json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const sendResetPasswordEmail = async (request, response) => {
  const { email } = request.body;
  const passwordResetToken = jwt.sign({ email }, process.env.JWT_SECRET);
  await User.updateOne({
    email,
    passwordResetToken,
  }).exec();
  transport = nodemailer.createTransport(transportSettings);
  const emailData = {
    from: '',
    to: email,
    subject: 'Reset Password',
    text: 'Reset Password',
    html:
      '<h1>Reset Password</h1></br><a href="http://localhost:3000/reset-password?token=' +
      passwordResetToken +
      '">Reset Password</a>',
  };
  transport.sendMail(emailData, (err, info) => {
    if (err) {
      return response.status(500).json({ message: err.message });
    }
    response.json({
      info,
      message: 'Email sent successfully',
    });
  });
};

const resetPassword = async (request, response) => {
  const { password, email } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ email }, { password: hashedPassword, passwordResetToken: null }).exec();
  response.json({
    message: 'Reset password',
  });
};

const sendVerificationEmail = async (request, response) => {
  const { email } = request.body;
  const emailVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
  await User.updateOne({
    email,
    emailVerificationToken,
  }).exec();
  transport = nodemailer.createTransport(transportSettings);
  const emailData = {
    from: '',
    to: email,
    subject: 'Email Verification',
    text: 'Email Verification',
    html:
      '<h1>Email Verification</h1></br><a href="http://localhost:3000/verify-email?token=' +
      emailVerificationToken +
      '">Verify Email</a>',
  };
  transport.sendMail(emailData, (err, info) => {
    if (err) {
      return response.status(500).json({ message: err.message });
    }
    response.json({
      info,
      message: 'Email sent successfully',
    });
  });
};

const verifyEmail = async (request, response) => {
  const { email } = request.body;
  await User.updateOne({ email }, { emailVerificationToken: null, emailVerified: true }).exec();
  response.json({
    message: 'Email verified',
  });
};

module.exports = {
  login,
  register,
  logout,
  sendResetPasswordEmail,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
