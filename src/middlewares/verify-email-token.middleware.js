const { userService, tokenService } = require('../services');

const verifyEmailToken = async (request, response, next) => {
  const authorization = request.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];
    const verifyToken = await userService.findUser({ emailVerificationToken: token });
    if (!verifyToken) {
      return response.status(401).json({ message: 'Invalid token' });
    }
    await tokenService.veryfyToken(token, (err, token) => {
      if (err) {
        return response.status(403).json({ message: err });
      }
      next();
    });
  } else {
    response.status(403).json({ message: 'No token provided' });
  }
};

module.exports = verifyEmailToken;
