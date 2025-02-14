"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
// Define log format
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
// Define log file paths
const logDirectory = path_1.default.join(__dirname, '../logs'); // Ensure logs directory exists
const mainLogPath = path_1.default.join(logDirectory, 'main.log');
// Create Winston logger
const logger = winston_1.default.createLogger({
    level: 'info', // Default log level for the logger
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), logFormat),
    transports: [
        new winston_1.default.transports.Console(), // Log to console
        // Log only info messages to info.log
        new winston_1.default.transports.File({
            filename: mainLogPath,
            level: 'info', // This captures info level messages and above
            maxsize: 5242880, // Optional: max size of file before rotating (5MB)
            maxFiles: 5, // Optional: number of files to keep in rotation
        })
    ]
});
exports.default = logger;
