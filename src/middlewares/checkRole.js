const checkRole = (role) => async (req, res, next) => {
  try {
    if (req.user.role !== role) {
      res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = checkRole;
