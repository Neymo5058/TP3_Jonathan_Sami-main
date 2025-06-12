import express from 'express';
import grimoireController from '../controller/grimoire-controller.js';

const router = express.Router();

router.get('/getAllGrimoires', grimoireController.getAllGrimoires);
router.post('/:magicianId/addSpell', grimoireController.addSpell);
router.post('/:magicianId/create', grimoireController.createGrimoire);
router.post('/:magicianId/acquireGrimoire', grimoireController.acquireGrimoire);

// router.post('/', authController.protect, authController.restrictTo('Admin'), grimoireController.createGrimoire);
// router.get('/:id', GrimoireController.getGrimoireById);

export default router;
