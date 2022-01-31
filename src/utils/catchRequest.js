const { validationResult } = require('express-validator');

const catchRequest = (fn) => (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(422).json({ errors: errors.array() });
  }
  Promise.resolve(fn(request, response, next)).catch((error) => response.status(500).json({ message: error }));
};

module.exports = catchRequest;
