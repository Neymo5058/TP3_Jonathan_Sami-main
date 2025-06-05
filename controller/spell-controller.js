import SortModel from '../model/SpellModel.js';
import MagicianModel from '../model/MagicianModel.js';
import logger from '../middleware/logger.js';

const SpellController = {
  async create(req, res) {
    const { name, level, school, effects, magicianId } = req.body;
    const magician = await MagicianModel.findById(magicianId);
    if (!magician) return res.status(404).json({ message: 'Magician not found' });

    if (level > magician.level || !magician.schools.includes(school)) {
      return res.status(400).json({ message: 'Invalid spell level or school' });
    }

    const spell = await SortModel.create({ name, level, school, effects });
    logger.info(`Spell created: ${spell.name}`);
    res.status(201).json(spell);
  }
};

export default SpellController;
