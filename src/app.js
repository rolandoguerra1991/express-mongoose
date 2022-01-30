// Import modules
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const bodyParser = require('body-parser');
const datBaseConnection = require('./utils/database');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes');
const origin = process.env.CORS_ORIGIN;

// Initialize the app
const app = express();

// Database connection
datBaseConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({ origin }));
app.use(compression());

// Router
app.use('/api/v1/', router);

module.exports = app;
