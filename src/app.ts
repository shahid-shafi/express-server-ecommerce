import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AppError from './utils/appError';
import combinedRouter from './routers';
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.use('/api/v1', combinedRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server 🌐`, 404));
})

export default app;