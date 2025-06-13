import MagicianModel from '../model/magicianModel.js';
import GrimoireModel from '../model/GrimoireModel.js';
import logger from '../middleware/logger.js';

const MagicianController = {
  async create(req, res) {
    try {
      const newMagician = await MagicianModel.create({ ...req.body, createdBy: req.user.id });
      logger.info('Magician created');
      res.status(201).json(newMagician);
    } catch (err) {
      logger.error(err.message);
      res.status(400).json({ error: err.message });
    }
  },

  async acquireGrimoire(req, res) {
    const { magicianId, grimoireId } = req.body;

    const magician = await MagicianModel.findById(magicianId);
    const grimoire = await GrimoireModel.findById(grimoireId);
    if (!magician || !grimoire) {
      return res.status(404).json({ message: 'Magician or Grimoire not found' });
    }

    magician.spellbooks.push({
      title: grimoire.title,
      level: magician.level,
      spells: grimoire.spells
    });

    await magician.save();
    logger.info(`Grimoire ${grimoire.title} acquired by ${magician.name}`);
    res.status(200).json({ message: 'Grimoire acquired', magician });
  },

  async getAll(req, res) {
    const magicians = await MagicianModel.find().populate('spellbooks.spells');
    res.status(200).json(magicians);
  }
};

export default MagicianController;
