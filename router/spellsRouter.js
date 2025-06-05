import express from 'express';
import SpellController from '../controller/spell-controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.post('/create', authenticate, SpellController.create);
export default router;
