import express from 'express';
import GrimoireController from '../controller/grimoire-controller.js';
import { authenticate, authorizeAdminOrOwner } from '../middleware/auth.js';
import GrimoireModel from '../model/GrimoireModel.js';

const router = express.Router();
const getGrimoireOwner = async (req) => {
  const grimoire = await GrimoireModel.findById(req.body.grimoireId);
  return grimoire?.owner;
};

router.post('/create', authenticate, GrimoireController.create);
router.post('/add-spell', authenticate, GrimoireController.addSpell);
router.get('/', GrimoireController.getAll);


export default router;
