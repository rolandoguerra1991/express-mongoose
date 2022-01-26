require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { datBaseConnection } = require('./utils/database');
const morgan = require('morgan');
const router = require('./routes');
// Database connection
datBaseConnection();

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/', router);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
