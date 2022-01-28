const mongoose = require('mongoose');

const datBaseConnection = () => {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Error connecting to database: ', err);
    });
};

module.exports = datBaseConnection;
