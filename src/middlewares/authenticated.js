const { userService, tokenService } = require('../services')

const authenticated = async (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(' ')[1]
    const user = await userService.findUser({ authToken: token })

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    await tokenService.verifyToken(token, (err, user) => {
      if (err) {
        return res.status(403).json({ message: err })
      }
      req.user = user
      next()
    })
  } else {
    res.status(403).json({ message: 'No token provided' })
  }
}

module.exports = authenticated
