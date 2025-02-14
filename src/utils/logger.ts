import winston from 'winston';
import path from 'path';

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Define log file paths
const logDirectory = path.join(__dirname, '../logs'); // Ensure logs directory exists
const mainLogPath = path.join(logDirectory, 'main.log');


// Create Winston logger
const logger = winston.createLogger({
    level: 'info', // Default log level for the logger
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console

        // Log only info messages to info.log
        new winston.transports.File({ 
            filename: mainLogPath, 
            level: 'info', // This captures info level messages and above
            maxsize: 5242880, // Optional: max size of file before rotating (5MB)
            maxFiles: 5, // Optional: number of files to keep in rotation
           
           
        })
    ]
});

export default logger;
