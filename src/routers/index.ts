import { Router } from 'express';
import userRouter from './userRouter';
import usernameRouter from './usernameRouter';
import userRoleRouter from './userRoleRouter';
import productRouter from './productRouter';
import categoryRouter from './categoryRouter';
import reviewRouter from './reviewRouter';

const combinedRouter: Router[] = [
    userRouter,
    usernameRouter,
    userRoleRouter,
    productRouter,
    categoryRouter,
    reviewRouter,
];

export default combinedRouter;