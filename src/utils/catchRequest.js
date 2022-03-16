const { validationResult } = require('express-validator')

const catchRequest = (fn) => (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
  }
  Promise.resolve(fn(req, res, next)).catch((err) => res.status(500).json({ message: err }))
}

module.exports = catchRequest
