const mongoose = require('mongoose');
const config = require('config');

const datBaseConnection = () => {
  mongoose
    .connect(config.get('database.connectionString'))
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Error connecting to database: ', err);
    });
};

module.exports = datBaseConnection;
