import express from 'express';
import magicianRouter from './magicianRouter.js';
import userRouter from './userRouter.js';
import authController from '../controller/auth-controller.js';
import grimoireRouter from './grimoireRouter.js';

const MainRouter = express.Router();

MainRouter.use('/magicians', authController.protect, magicianRouter);
MainRouter.use('/users', userRouter);
MainRouter.use('/grimoires', grimoireRouter);

export default MainRouter;
