import express from 'express';
import MagicianController from '../controller/magician-controller.js';
import authController from '../controller/auth-controller.js';

const MagicianRouter = express.Router();

MagicianRouter.post('/:magicianId/spells', authController.protect, MagicianController.createSpell);
MagicianRouter.post('/:userId', authController.protect, MagicianController.createMagician);

export default MagicianRouter;
