import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import router from './routes/general';

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());

// Middleware to log all requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});


app.use('', router);

export default app