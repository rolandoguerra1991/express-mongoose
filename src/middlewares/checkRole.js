const checkRole = (role) => async (req, res, next) => {
  try {
    if (req.user.role !== role) {
      res.status(403).json({ message: 'You are not authorized to access this resource' })
    }
    next()
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error'
    })
  }
}

module.exports = checkRole
