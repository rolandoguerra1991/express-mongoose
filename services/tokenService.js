const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, config.get('jsonwebtoken.secret'));
    return token;
  } catch (error) {
    throw error;
  }
};

const veryfyToken = async (token, callback) => {
  jwt.verify(token, config.get('jsonwebtoken.secret'), callback);
};

module.exports = {
  generateToken,
  veryfyToken,
};
