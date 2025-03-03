import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import router from './routes/general';
import path from 'path';
import cors from 'cors';


const app = express();
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

// Middleware to log all requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});


app.use('', router);

export default app