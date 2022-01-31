const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw error;
  }
};

const veryfyToken = async (token, callback) => {
  jwt.verify(token, process.env.JWT_SECRET, callback);
};

module.exports = {
  generateToken,
  veryfyToken,
};
