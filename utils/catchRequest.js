const { validationResult } = require('express-validator');

const catchRequest = (fn) => (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(422).json({ errors: errors.array() });
    }
    fn(request, response, next);
  } catch (error) {
    throw error;
  }
};

module.exports = catchRequest;
