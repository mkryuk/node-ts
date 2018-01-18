export const config = {
  IP: process.env.NODEJS_IP || '127.0.0.1',
  PORT: normalizePort(process.env.PORT || '8080'),
  SECRET_TOKEN_KEY: process.env.TOKEN_SECRET || '#tokenSecret#',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/nodets',
  MONGO_TEST_CONNECTION_STRING: process.env.MONGO_TEST_CONNECTION_STRING || 'mongodb://localhost:27017/nodets_tests',
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return 0;
}
