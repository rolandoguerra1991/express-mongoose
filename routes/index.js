const express = require('express');

const authRoutes = require('./auth.router');
const usersRoutes = require('./users.router');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);


module.exports = router;
