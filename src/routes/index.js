const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Dynamic Routing
// Adds all routes from routes folder
fs.readdir(path.join(__dirname, '../routes/'), (err, files) => {
  if (!err) {
    files.forEach((file) => {
      if (file !== 'index.js') {
        const url = `/${file.split('.')[0]}/`
        const route = `./${file}`
        router.use(url, require(route))
      }
    })
  }
})

module.exports = router
