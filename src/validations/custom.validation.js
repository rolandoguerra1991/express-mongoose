const userService = require('../services/user.service');

const emailIsTaken = async (email) => {
  const user = await userService.findUser({ email });
  if (user) {
    throw 'Email already exists';
  }
  return true;
};

module.exports = {
  emailIsTaken,
};
