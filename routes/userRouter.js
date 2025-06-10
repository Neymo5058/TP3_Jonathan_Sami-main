import express from 'express';
import authController from '../controller/auth-controller.js';

const UserRouter = express.Router();

UserRouter.post('/signup', authController.signup);
UserRouter.post('/login', authController.login);

export default UserRouter;
