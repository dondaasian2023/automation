require('dotenv').config();
import winston, { format } from 'winston';

const dateFormat = () => new Date(Date.now()).toLocaleString();

const LOG_CONFIGURATION = {
    level: process.env.LOG_LEVEL,
    format: format.combine(
        format.printf(info => `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`)
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: process.env.LOG_LEVEL,
            filename: process.env.LOG_FILENAME,
        }),
    ],
};

export const logger = winston.createLogger(LOG_CONFIGURATION);
