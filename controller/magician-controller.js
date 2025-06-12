import Magician from '../model/Magician.js';
import MagicianModel from '../model/MagicianModel.js';
import GrimoireModel from '../model/GrimoireModel.js';
import AppError from '../middleware/appError.js';
import logger from '../middleware/logger.js';

const MagicianController = {
  acquireGrimoire: async (req, res, next) => {
    try {
      const magician = await MagicianModel.findById(req.params.id);
      if (!magician) return next(new AppError(res.__('MAGICIAN_NOT_FOUND'), 404));

      const grimoire = await GrimoireModel.findById(req.params.grimoireId);
      if (!grimoire) return next(new AppError(res.__('GRIMOIRE_NOT_FOUND'), 404));

      const newMagician = new Magician(magician);
      newMagician.acquireGrimoire(grimoire);

      magician.spellbooks = newMagician.spellbooks;
      await magician.save();

      logger.info(`Magician ${magician.name} acquired grimoire ${grimoire.name}`);

      res.status(200).json({
        message: res.__('GRIMOIRE_ACQUIRED'),
        spellbooks: magician.spellbooks,
      });
    } catch (err) {
      logger.error(`Error collecting the grimoire: ${err.message}`);
      next(err);
    }
  },

  createSpell: async (req, res, next) => {
    try {
      const magicianFound = await MagicianModel.findById(req.params.magicianId);

      if (!magicianFound) {
        return next(new AppError(res.__('MAGICIAN_NOT_FOUND'), 404));
      }
      const { grimoireTitle } = req.body;

      const magician = new Magician(magicianFound);
      const newSpell = magician.createSpell(req.body, grimoireTitle);

      magicianFound.spellbooks = magician.spellbooks;
      await magicianFound.save();

      logger.info(`Magician ${magician.name} created a spell: ${newSpell.name}`);

      res.status(201).json({
        message: res.__('SPELL_CREATED'),
        spell: newSpell,
        spellbooks: magicianFound.spellbooks,
      });
    } catch (err) {
      logger.error('Error creating spell', err);
      next(err);
    }
  },

  createMagician: async (req, res, next) => {
    try {
      const { name, appearance, stats, level, schools, types } = req.body;

      if (!name) {
        return next(new AppError(res.__('MAGICIAN_NAME_REQUIRED'), 400));
      }

      const newMagician = await MagicianModel.create({
        name,
        appearance,
        stats,
        level,
        schools,
        types,
        spellbooks: [],
      });
      const defaultGrimoire = await GrimoireModel.create({
        name: 'Default Grimoire',
        schools,
        spells: [],
        owner: newMagician._id,
      });
      newMagician.spellbooks.push(defaultGrimoire._id);
      await newMagician.save();

      logger.info(`Magician ${newMagician.name} created with default grimoire`);

      res.status(201).json({
        message: res.__('MAGICIAN_CREATED'),
        magician: newMagician,
      });
    } catch (err) {
      logger.error('Error creating magician', err);
      next(err);
    }
  },
};

export default MagicianController;
