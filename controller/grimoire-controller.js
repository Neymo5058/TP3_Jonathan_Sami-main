import GrimoireModel from '../model/GrimoireModel.js';
import SortModel from '../model/SpellModel.js';
import logger from '../middleware/logger.js';
import MagicianModel from '../model/magicianModel.js';

const GrimoireController = {
  async create(req, res) {
    const { title, schools, spells, owner } = req.body;
    const magician = await MagicianModel.findById(owner);
    if (!magician) return res.status(404).json({ message: 'Magician not found' });

    const validSchools = schools.filter((s) => magician.schools.includes(s));
    const grimoire = await GrimoireModel.create({ title, schools: validSchools, spells, owner });
    logger.info(`Grimoire created: ${grimoire.title}`);
    res.status(201).json(grimoire);
  },

  async addSpell(req, res) {
    const { grimoireId, spellId } = req.body;
    const grimoire = await GrimoireModel.findById(grimoireId);
    const spell = await SortModel.findById(spellId);
    if (!grimoire || !spell) return res.status(404).json({ message: 'Grimoire or Spell not found' });

    grimoire.spells.push(spellId);
    await grimoire.save();
    logger.info(`Spell ${spell.name} added to grimoire ${grimoire.title}`);
    res.status(200).json({ message: 'Spell added to grimoire', grimoire });
  },

  async getAll(req, res) {
    const grimoires = await GrimoireModel.find().populate('spells');
    res.status(200).json(grimoires);
  }
};

export default GrimoireController;
