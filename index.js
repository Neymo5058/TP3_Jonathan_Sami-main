import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import i18n from './middleware/i18n.js';
import logger from './middleware/logger.js';

import usersRouter from './router/usersRouter.js';
import magiciansRouter from './router/magiciansRouter.js';
import spellsRouter from './router/spellsRouter.js';
import grimoiresRouter from './router/grimoiresRouter.js';
import effectRouter from './router/effectRouter.js';

import UserModel from './model/UserModel.js';
import MagicianModel from './model/magicianModel.js';
import GrimoireModel from './model/GrimoireModel.js';
import SortModel from './model/SpellModel.js';
import EffectModel from './model/EffectModel.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(i18n.init);

mongoose.connect("mongodb+srv://jonatantd2:Anjo7784@cluster0.ducq7xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    logger.info('✅ Connected to MongoDB');
    await seedDatabase();
  })
  .catch((err) => logger.error('❌ MongoDB connection error: ' + err.message));

app.use('/api/users', usersRouter);
app.use('/api/magicians', magiciansRouter);
app.use('/api/spells', spellsRouter);
app.use('/api/grimoires', grimoiresRouter);
app.use('/api/effects', effectRouter);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({ message: 'Erreur interne du serveur' });
});

app.listen(port, () => logger.info(`🚀 Server started on port ${port}`));

// 🔽 Seed function
async function seedDatabase() {
  try {
    const loadData = (filename) => {
      const filePath = path.join('./seed', filename);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    };

    const users = loadData('seed.users.json');
    const magicians = loadData('seed.magicians.json');
    const grimoires = loadData('seed.grimoires.json');
    const spells = loadData('seed.spells.json');
    const effects = loadData('seed.effects.json');

    await UserModel.deleteMany({});
    await MagicianModel.deleteMany({});
    await GrimoireModel.deleteMany({});
    await SortModel.deleteMany({});
    await EffectModel.deleteMany({});

    await UserModel.insertMany(users);
    await MagicianModel.insertMany(magicians);
    await GrimoireModel.insertMany(grimoires);
    await SortModel.insertMany(spells);
    await EffectModel.insertMany(effects);

    logger.info('📦 Database fully seeded');
  } catch (error) {
    logger.error('❌ Seed error: ' + error.message);
  }
}