const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

const authenticated = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const accessTokenSecret = process.env.JWT_SECRET;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const verifyToken = await User.findOne({ token: token }).exec();

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

module.exports = authenticated;
