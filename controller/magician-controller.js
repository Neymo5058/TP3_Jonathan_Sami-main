import Magician from '../model/Magician.js';
import MagicianModel from '../model/MagicianModel.js';
import UserModel from '../model/UserModel.js';

const MagicianController = {
  createSpell: async (req, res, next) => {
    try {
      //
      const magicianFound = await MagicianModel.findById(req.params.magicianId);

      if (!magicianFound) {
        return res.status(404).json({ message: 'Magician not found' });
      }

      const magician = new Magician(magicianFound);

      const newSpell = magician.createSpell();

      const HasSchool = magician.schools.every((school) => {
        const schools = newSpell.school?.includes(school);
        if (!school) {
          return res.status(400).json({
            message: 'There is no spell!',
          });
        }
      });
      res.status(201).json({
        message: 'Spell created successfully',
        spell: newSpell,
        spells: magicianFound.spells,
      });

      return res.status(400).json({
        message: 'Le sort est trop puissant pour ce magicien',
      });
    } catch (err) {
      next(err);
    }
  },
  createMagician: async (req, res, next) => {
    try {
      const { name, appearance } = req.body;
      const userId = req.params.userId;

      const user = await UserModel.findById(userId);
      if (!user) {
        return next(new AppError('No User found !', 404));
      }

      const newMagician = await Magician.createMagician(name, appearance, userId);

      res.status(201).json({
        message: 'Magician created',
        magician: newMagician,
      });
    } catch (err) {
      next(err);
    }
  },
};
export default MagicianController;
