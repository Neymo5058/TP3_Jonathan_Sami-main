import express from 'express';
import SpellController from '../controller/spell-controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.post('/create', authenticate, SpellController.create);
router.post('/cast', authenticate, SpellController.castSpell);
router.post('/add-effect', authenticate, SpellController.addEffectToSpell);
export default router;
