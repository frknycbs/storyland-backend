import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import router from './routes/general';
import path from 'path';



const app = express();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json());

app.use(bodyParser.json());

// Middleware to log all requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});


app.use('', router);

export default app