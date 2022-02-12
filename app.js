// Import modules
// process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const bodyParser = require('body-parser');
const datBaseConnection = require('./utils/database');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const config = require('config');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./routes');

// Initialize the app
const app = express();

// Database connection
datBaseConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({ origin: config.get('cors.origin') }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'uploads')));

// Router
app.use('/api/v1/', router);

module.exports = app;
