// Import modules
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const path = require('path')
const cookieParser = require('cookie-parser')
const router = require('./routes')

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config')
const config = require('config')

// Initialize the app
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({ origin: config.get('cors.origin') }))
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')))

// Router
app.use('/api/v1/', router)

module.exports = app
