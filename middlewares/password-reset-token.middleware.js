const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const passwordResetToken = async (request, response, next) => {
  const authorization = request.headers.authorization;
  const accessTokenSecret = process.env.JWT_SECRET;

  if (authorization) {
    const token = authorization.split(' ')[1];
    const verifyToken = await userService.updateUser({ passwordResetToken: token });

    if (!verifyToken) {
      return response.status(401).json({ message: 'Invalid token' });
    }
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return response.status(403).json({ message: err });
      }
      request.user = user;
      next();
    });
  } else {
    response.status(403).json({ message: 'No token provided' });
  }
};

module.exports = passwordResetToken;
