require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./routes');

// Database connection
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Error connecting to database: ', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/', router);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});