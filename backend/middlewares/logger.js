const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/requests.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});