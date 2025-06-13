import express from 'express';
import EffectModel from '../model/EffectModel.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const effects = await EffectModel.find();
    res.status(200).json(effects);
  } catch (err) {
    res.status(500).json({ message: req.t('messages.serverError') });
  }
});


router.post('/', authenticate, async (req, res) => {
  try {
    const effect = await EffectModel.create(req.body);
    res.status(201).json(effect);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
