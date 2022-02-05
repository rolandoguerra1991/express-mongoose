const userService = require('../services/userService');

const emailIsTaken = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (user) {
      return Promise.reject('Email already exists');
    }
  });
};

const alreadyLoggedIn = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (user.authToken) {
      return Promise.reject('Already logged in');
    }
  });
};

const isEmailVerified = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (user.emailVerified) {
      return Promise.reject('Email already verified');
    }
  });
};

const validateToken = async (payload) => {
  return await userService.findUser(payload).then((user) => {
    if (!user) {
      return Promise.reject('Invalid token');
    }
  });
};

const validateID = async (id) => {
  return await userService.findUserById(id).then((user) => {
    if (!user) {
      return Promise.reject('Invalid ID');
    }
  });
};

const verifyIfExists = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (!user) {
      return Promise.reject('Invalid user');
    }
  });
};

module.exports = {
  emailIsTaken,
  alreadyLoggedIn,
  isEmailVerified,
  validateToken,
  validateID,
  verifyIfExists,
};
