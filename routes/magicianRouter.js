import express from 'express';
import MagicianController from '../controller/magician-controller.js';

const MagicianRouter = express.Router();

MagicianRouter.post('/:userId', MagicianController.createMagician);
MagicianRouter.post('/:magicianId/spells', MagicianController.createSpell);

export default MagicianRouter;
