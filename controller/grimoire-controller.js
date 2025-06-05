import GrimoireModel from '../model/GrimoireModel.js';
import MagicianModel from '../model/MagicianModel.js';
import SortModel from '../model/SpellModel.js';
import logger from '../middleware/logger.js';

const GrimoireController = {
  async create(req, res) {
    const { name, schools, spells, owner } = req.body;
    const magician = await MagicianModel.findById(owner);
    if (!magician) return res.status(404).json({ message: 'Magician not found' });

    const validSchools = schools.filter((s) => magician.schools.includes(s));
    const grimoire = await GrimoireModel.create({ name, schools: validSchools, spells, owner });
    logger.info(`Grimoire created: ${grimoire.name}`);
    res.status(201).json(grimoire);
  },

  async addSpell(req, res) {
    const { grimoireId, spellId } = req.body;
    const grimoire = await GrimoireModel.findById(grimoireId);
    const spell = await SortModel.findById(spellId);
    if (!grimoire || !spell) return res.status(404).json({ message: 'Not found' });

    if (!grimoire.schools.includes(spell.school)) grimoire.schools.push(spell.school);
    grimoire.spells.push(spellId);
    await grimoire.save();
    logger.info(`Spell ${spell.name} added to grimoire ${grimoire.name}`);
    res.status(200).json(grimoire);
  },
  async getAll(req, res) {
    try {
      const grimoires = await GrimoireModel.find();
      res.status(200).json(grimoires);
    } catch (err) {
      logger.error('Get all grimoires error: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  },
};

export default GrimoireController;
