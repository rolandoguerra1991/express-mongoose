// Import modules
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const path = require('path')
const cookieParser = require('cookie-parser')
const config = require('./utils/config')
const router = require('./routes')

// Initialize the app
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan(config.get('server.environment') === 'development' ? 'dev' : 'combined'))
app.use(cors({ origin: config.get('cors.origin') }))
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')))

// Router
app.use('/api/v1/', router)

module.exports = app
