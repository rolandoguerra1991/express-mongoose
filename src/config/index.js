const database = require('./database')
const cors = require('./cors')
const email = require('./email')
const jsonwebtoken = require('./jsonwebtoken')
const authorization = require('./authorization')
const server = require('./server')

module.exports = { database, cors, email, jsonwebtoken, authorization, server }
