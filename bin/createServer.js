#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../src/app')
const http = require('http')
const mongoose = require('mongoose')
const config = require('../src/utils/config')

/**
 * Get port from environment and store in Express.
 */

const port = config.get('server.port')
app.set('port', port)

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

// Database connection
const datBaseConnection = () => {
  mongoose
    .connect(config.get('database.connectionString'))
    .then(() => {
      console.log('Connected to database')
    })
    .catch((err) => {
      console.log('Error connecting to database: ', err)
    })
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
  * Listen on provided port, on all network interfaces.
  */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
server.on('listening', datBaseConnection)
