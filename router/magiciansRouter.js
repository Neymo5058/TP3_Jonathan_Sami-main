import express from 'express';
import MagicianController from '../controller/magician-controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.post('/', authenticate, MagicianController.create);
router.post('/acquire-grimoire', authenticate, MagicianController.acquireGrimoire);
router.get('/', MagicianController.getAll);

export default router;
