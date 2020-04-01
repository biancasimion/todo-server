// Added to support generator functions
require('babel-polyfill');
const path = require('path');
const http = require('http');

global.appRoot = path.resolve(__dirname);

const debug = require('debug')('my-account-api:server');
const app = require('./lib/app');
const config = require('./config/default');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

const { port } = config;
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  debug(`Listening on port ${addr.port}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
