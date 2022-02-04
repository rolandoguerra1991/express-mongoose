const userService = require('../services/userService');

const emailIsTaken = async (email) => {
  const user = await userService.findUser({ email });
  if (user) {
    throw 'Email already exists';
  }
  return true;
};

const alreadyLoggedIn = async (email) => {
  const user = await userService.findUser({ email });
  if (user.token) {
    throw 'Already logged in';
  }
};

const isEmailVerified = async (email) => {
  const user = await userService.findUser({ email });
  if (user.emailVerified) {
    throw 'Email already verified';
  }
};

const validateToken = async (payload) => {
  const user = await userService.findUser(payload);
  if (!user) {
    throw 'Invalid token';
  }
};

const validateID = async (id) => {
  const user = await userService.findUserById(id);
  if (!user) {
    throw 'Invalid ID';
  }
}

module.exports = {
  emailIsTaken,
  alreadyLoggedIn,
  isEmailVerified,
  validateToken,
  validateID,
};
