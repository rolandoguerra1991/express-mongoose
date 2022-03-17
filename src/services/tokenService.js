const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const generateToken = async (payload) => {
  const token = jwt.sign(payload, config.get('jsonwebtoken.secret'))
  return token
}

const verifyToken = async (token, callback) => {
  jwt.verify(token, config.get('jsonwebtoken.secret'), callback)
}

module.exports = {
  generateToken,
  verifyToken
}
