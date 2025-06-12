import SortModel from '../model/SpellModel.js';
import MagicianModel from '../model/MagicianModel.js';
import EffectModel from '../model/EffectModel.js';
import logger from '../middleware/logger.js';
import GrimoireModel from '../model/GrimoireModel.js';

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
  },

  async castSpell(req, res) {
    const { magicianId, spellId } = req.body;

    try {
      const magician = await MagicianModel.findById(magicianId);
      const spell = await SortModel.findById(spellId);
      if (!magician || !spell) {
        return res.status(404).json({ message: 'Magician or spell not found' });
      }

      // Load grimoires owned by the magician
      const grimoires = await GrimoireModel.find({ _id: { $in: magician.spellbooks } });

      // Check if any grimoire includes the spell
      const knowsSpell = grimoires.some((grimoire) => grimoire.spells.some((id) => id.toString() === spellId));

      if (!knowsSpell) {
        return res.status(403).json({ message: 'Magician does not possess this spell' });
      }

      const effects = await EffectModel.find({ _id: { $in: spell.effects } });

      let spellResult = {
        message: `${magician.name} casts ${spell.name}`,
        appliedEffects: [],
        updatedStats: {},
      };

      effects.forEach((effect) => {
        if (effect.types.includes('damage')) {
          magician.stats.Spell_Power = Math.max(0, magician.stats.Spell_Power - 5);
          spellResult.appliedEffects.push(`Damaged enemy using ${effect.description}`);
        }
        if (effect.types.includes('heal')) {
          magician.stats.endurance += 3;
          spellResult.appliedEffects.push(`Healed self using ${effect.description}`);
        }
      });

      await magician.save();
      spellResult.updatedStats = magician.stats;

      logger.info(`${magician.name} casted ${spell.name}`);
      res.status(200).json(spellResult);
    } catch (err) {
      logger.error('Error casting spell: ' + err.message);
      res.status(500).json({ message: req.__('messages.serverError') });
    }
  },
};

export default SpellController;
