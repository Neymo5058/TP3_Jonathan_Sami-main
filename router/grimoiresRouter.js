import express from 'express';
import GrimoireController from '../controller/grimoire-controller.js';
import { authenticate } from '../middleware/auth.js';


const router = express.Router();


router.post('/create', authenticate, GrimoireController.create);
router.post('/add-spell', authenticate, GrimoireController.addSpell);
router.get('/', GrimoireController.getAll);


export default router;
