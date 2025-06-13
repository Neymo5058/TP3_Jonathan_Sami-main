import EffectModel from '../model/EffectModel.js';
import logger from '../middleware/logger.js';

const EffectController = {
  
  async getAll(req, res) {
    try {
      const effects = await EffectModel.find();
      res.status(200).json(effects);
    } catch (err) {
      logger.error('Error getting effects: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  },

  // GET /api/effects/:id
  async getById(req, res) {
    try {
      const effect = await EffectModel.findById(req.params.id);
      if (!effect) return res.status(404).json({ message: 'Effect not found' });
      res.status(200).json(effect);
    } catch (err) {
      logger.error('Error getting effect by ID: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  },

  // POST /api/effects
  async create(req, res) {
    try {
      const effect = await EffectModel.create(req.body);
      logger.info(`Effect created: ${effect.name}`);
      res.status(201).json(effect);
    } catch (err) {
      logger.error('Error creating effect: ' + err.message);
      res.status(400).json({ message: err.message });
    }
  },

  // PUT /api/effects/:id
  async update(req, res) {
    try {
      const effect = await EffectModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!effect) return res.status(404).json({ message: 'Effect not found' });
      logger.info(`Effect updated: ${effect.name}`);
      res.status(200).json(effect);
    } catch (err) {
      logger.error('Error updating effect: ' + err.message);
      res.status(400).json({ message: err.message });
    }
  },

  // DELETE /api/effects/:id
  async remove(req, res) {
    try {
      const effect = await EffectModel.findByIdAndDelete(req.params.id);
      if (!effect) return res.status(404).json({ message: 'Effect not found' });
      logger.info(`Effect deleted: ${effect.name}`);
      res.status(200).json({ message: 'Effect deleted successfully' });
    } catch (err) {
      logger.error('Error deleting effect: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  }
};

export default EffectController;
