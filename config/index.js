const database = require('./database');
const email = require('./email');
const authorization = require('./authorization');
const jwt = require('./jwt');
const cors = require('./cors');
const app = require('./app');

module.exports = {
  database,
  email,
  authorization,
  jwt,
  cors,
  app,
};
