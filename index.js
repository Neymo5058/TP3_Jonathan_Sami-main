import express from 'express';
import mongoose from 'mongoose';
import i18n from './middleware/i18n.js';
import logger from './middleware/logger.js';
import MagicianModel from './model/MagicianModel.js';
import usersRouter from './router/usersRouter.js';
import magiciansRouter from './router/magiciansRouter.js';
import spellsRouter from './router/spellsRouter.js';
import grimoiresRouter from './router/grimoiresRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(i18n.init);

mongoose
  .connect( "mongodb+srv://jonatantd2:Anjo7784@cluster0.ducq7xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => logger.info('Connected to MongoDB'));

app.use('/api/users', usersRouter);
app.use('/api/magicians', magiciansRouter);
app.use('/api/spells', spellsRouter);
app.use('/api/grimoires', grimoiresRouter);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({ message: 'Erreur interne du serveur' });
});

app.listen(port, () => logger.info(`Server started on port ${port}`));
