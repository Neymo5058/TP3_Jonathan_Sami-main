import express from 'express';
import magicianRouter from './magicianRouter.js';
import userRouter from '../routes/userRouter.js';
import userController from '../model/UserModel.js';
const MainRouter = express.Router();

MainRouter.use('/magicians', magicianRouter);
MainRouter.use('/users', userRouter);

export default MainRouter;
