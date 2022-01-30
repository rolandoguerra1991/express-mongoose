const express = require('express');
const router = express.Router();
const fs = require('fs');

// Dyanmic Routing
// Adds all routes from routes folder
fs.readdir('./routes', (err, files) => {
  files.forEach((file) => {
    if (file !== 'index.js') {
      const url = `/${file.split('.')[0]}/`;
      const route = `./${file}`;
      router.use(url, require(route));
    }
  });
});

module.exports = router;
