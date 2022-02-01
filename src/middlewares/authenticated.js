const { userService, tokenService } = require('../services');

const authenticated = async (request, response, next) => {
  const authorization = request.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const user = await userService.findUser({ token });

    if (!user) {
      return response.status(401).json({ message: 'Invalid token' });
    }
    await tokenService.veryfyToken(token, (err, user) => {
      if (err) {
        return response.status(403).json({ message: err });
      }
      request.userId = user.id;
      next();
    });
  } else {
    response.status(403).json({ message: 'No token provided' });
  }
};

module.exports = authenticated;
