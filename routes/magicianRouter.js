import express from 'express';
import MagicianController from '../controller/magician-controller.js';

const MagicianRouter = express.Router();

MagicianRouter.post('/createSpell', MagicianController.createSpell);

MagicianRouter.post('/:userId', MagicianController.createSpell);

export default MagicianRouter;
