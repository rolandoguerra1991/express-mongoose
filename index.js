// Import modules
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const bodyParser = require('body-parser');
const datBaseConnection = require('./utils/database');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

// Initialize the app
const app = express();

// Database connection
datBaseConnection();

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Routes
app.use('/api/v1/', router);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
