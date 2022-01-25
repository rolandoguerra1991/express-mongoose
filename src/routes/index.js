const express = require('express');
const router = express.Router();

// Routes go here
router.get("/test", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

module.exports = router;