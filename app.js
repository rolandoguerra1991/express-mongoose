// Import modules
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const bodyParser = require('body-parser');
const datBaseConnection = require('./utils/database');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes');

// Initialize the app
const app = express();

// Database connection
datBaseConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(compression());

// Routes
app.use('/api/v1/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
