import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv'; 
import combinedRouter from './routers';
import catchAsync from './utils/catchAsync';
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

app.all('*', catchAsync(async (req: Request, res: Response) => {
    res.status(404).json({
        result: false,
        message: `Can't find ${req.originalUrl} on this Server 🌐`,
        data: null
    })
}))

export default app;