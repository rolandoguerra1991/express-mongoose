const { validationResult } = require('express-validator');

const catchValidations = (fn) => (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  return fn(request, response, next);
}

module.exports = catchValidations;
