const express = require('express');
const { helloWorldController } = require('../controllers');
const router = express.Router();

// Routes go here
router.get("/test", helloWorldController.helloWorld);

module.exports = router;