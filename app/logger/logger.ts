import winston from 'winston';

const logger = winston.createLogger({
    level: 'info', // Set the log level (e.g., 'info', 'debug', 'warn', 'error')
    format: winston.format.json(), // Choose a log format (e.g., JSON, plain text)
    transports: [
      new winston.transports.Console(), // Output logs to the console
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Save error logs to a file
      new winston.transports.File({ filename: 'logs/combined.log' }) // Save all logs to a file
    ]
  });

  export default logger;