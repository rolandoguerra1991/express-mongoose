const guest = async (request, response, next) => {
  if (request.user || request.headers.authorization) {
    response.status(403).json({ message: 'user has already been authenticated before.' });
  }
  next();
};

module.exports = guest;
