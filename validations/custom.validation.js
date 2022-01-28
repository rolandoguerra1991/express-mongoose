const userService = require('../services/user.service');

const emailIsTaken = async (email) => {
  const user = await userService.findUserByField('email', email);
  if (user) {
    throw new Error('Email already exists');
  }
  return true;
};

module.exports = {
  emailIsTaken,
};
