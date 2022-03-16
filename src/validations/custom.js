const userService = require('../services/userService')

const emailIsTaken = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (user) {
      return Promise.reject(new Error('Email already exists'))
    }
  }).catch(err => Promise.reject(err))
}

const alreadyLoggedIn = async (email) => {
  return await verifyIfExists(email).then(async () => {
    return await userService.findUser({ email }).then((user) => {
      if (user.authToken) {
        return Promise.reject(new Error('Already logged in'))
      }
    })
  }).catch(err => Promise.reject(err))
}

const isEmailVerified = async (email) => {
  return await verifyIfExists(email).then(async () => {
    return await userService.findUser({ email }).then((user) => {
      if (user.emailVerified) {
        return Promise.reject(new Error('Email already verified'))
      }
    })
  }).catch(err => Promise.reject(err))
}

const validateToken = async (payload) => {
  return await userService.findUser(payload).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Invalid token'))
    }
  }).catch(err => Promise.reject(err))
}

const validateID = async (id) => {
  return await userService.findUserById(id).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Invalid ID'))
    }
  }).catch(err => Promise.reject(err))
}

const verifyIfExists = async (email) => {
  return await userService.findUser({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Invalid user'))
    }
  }).catch(err => Promise.reject(err))
}

module.exports = {
  emailIsTaken,
  alreadyLoggedIn,
  isEmailVerified,
  validateToken,
  validateID,
  verifyIfExists
}
