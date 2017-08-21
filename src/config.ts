export const config = {
  ip: process.env.NODEJS_IP || "127.0.0.1",
  port: normalizePort(process.env.PORT || 8080),
  secretTokenKey: process.env.TOKEN_SECRET || "#tokenSecret#",
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
