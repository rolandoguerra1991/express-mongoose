const { userService } = require('../services');

const guest = async (request, response, next) => {
  const user = await userService.findUser({ email: request.body.email });
  if (user && user.token) {
    response.status(403).json({ message: 'user has already been authenticated before.' });
  }
  next();
};

module.exports = guest;
