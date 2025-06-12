import MagicianModel from '../model/MagicianModel.js';
import logger from '../middleware/logger.js';

const MagicianController = {
  async create(req, res) {
    try {
      const magician = await MagicianModel.create({
        ...req.body,
        createdBy: req.user.id
      });
      logger.info(`Magician created: ${magician.name}`);
      res.status(201).json(magician);
    } catch (err) {
      logger.error('Error creating magician: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  },

  async acquireGrimoire(req, res) {
    const { magicianId, grimoireId } = req.body;
    const magician = await MagicianModel.findById(magicianId);
    if (!magician) return res.status(404).json({ message: 'Magician not found' });

    magician.spellbooks.push(grimoireId);
    await magician.save();
    logger.info(`Magician ${magician.name} acquired grimoire ${grimoireId}`);
    res.status(200).json(magician);
  },
  async getAll(req, res) {
    const magicians = await MagicianModel.find();
    res.json(magicians);
  },
};

export default MagicianController;
