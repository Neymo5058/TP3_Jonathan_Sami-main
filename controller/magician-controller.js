import MagicianModel from '../model/MagicianModel.js';
import logger from '../middleware/logger.js';

const MagicianController = {
  async create(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id };
      const magician = await MagicianModel.create(data);
      logger.info(req.__('logs.magicianCreated', { name: magician.name }));
      res.status(201).json(magician); // or translateMagician(magician, req)
    } catch (err) {
      logger.error(`Create magician error: ${err.message}`);
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
