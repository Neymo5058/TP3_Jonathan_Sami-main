import MagicianModel from '../model/MagicianModel.js';
import Magician from '../model/Magician.js';
import GrimoireModel from '../model/GrimoireModel.js';
import AppError from '../middleware/appError.js';
import logger from '../middleware/logger.js';

const GrimoireController = {
  addSpell: async (req, res, next) => {
    try {
      const { magicianId } = req.params;
      const { name, level, school, effects, power, grimoireTitle } = req.body;

      const magicianData = await MagicianModel.findById(magicianId);

      if (!magicianData) {
        return next(new AppError(res.__('MAGICIAN_NOT_FOUND'), 404));
      }

      const newMagician = new Magician(magicianData);

      const newSpell = newMagician.createSpellInGrimoire(
        { name, level, school, effects, power },
        grimoireTitle || 'Default Grimoire'
      );

      magicianData.spellbooks = newMagician.spellbooks;
      magicianData.spells = newMagician.spells;
      await magicianData.save();

      res.status(201).json({
        status: 'success',
        message: res.__('SPELL_CREATED'),
        spell: newSpell,
      });
    } catch (err) {
      next(err);
    }
  },
  createGrimoire: async (req, res, next) => {
    try {
      const { magicianId } = req.params;
      const { title, schools, level } = req.body;

      const magicianFound = await MagicianModel.findById(magicianId);
      if (!magicianFound) {
        return next(new AppError('Magician not found', 404));
      }

      const magician = new Magician(magicianFound);
      const grimoireData = Magician.createGrimoire({
        title: title ?? null,
        owner: magician.id,
        schools: schools ?? magician.schools,
        level: level ?? magician.level,
      });

      const createdGrimoire = await GrimoireModel.create(grimoireData);

      res.status(201).json({
        status: 'success',
        message: res.__('GRIMOIRE_CREATED'),
        spell: newSpell,
      });
    } catch (err) {
      next(err);
    }
  },
  getAllGrimoires: async (req, res, next) => {
    try {
      const grimoires = await GrimoireModel.find();

      res.status(200).json({
        status: 'success',
        count: grimoires.length,
        data: grimoires,
      });
    } catch (err) {
      next(err);
    }
  },

  acquireGrimoire: async (req, res, next) => {
    try {
      const { magicianId } = req.params;
      const { grimoireId } = req.body;

      const magicianData = await MagicianModel.findById(magicianId);

      if (!magicianData) {
        return next(new AppError(res.__('MAGICIAN_NOT_FOUND'), 404));
      }
      const grimoire = await GrimoireModel.findById(grimoireId);

      if (!grimoire) {
        return next(new AppError(res.__('GRIMOIRE_NOT_FOUND'), 404));
      }

      const magician = new Magician(magicianData);
      magician.acquireGrimoire(grimoire);

      magicianData.spellbooks.push({
        title: grimoire.name ?? 'Untitled Grimoire',
        spells: grimoire.spells ?? [],
        level: grimoire.level ?? 1,
      });

      await magicianData.save();

      res.status(200).json({
        status: 'success',
        message: res.__('GRIMOIRE_ACQUIRED'),
        magicianData,
      });
    } catch (err) {
      next(err);
    }
  },
};
export default GrimoireController;
