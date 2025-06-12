import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import MainRouter from './router/MainRouter.js';
import userRouter from './router/userRouter.js';
import grimoireRouter from './router/grimoireRouter.js';
import i18n from './middleware/i18n.js';

const app = express();
const port = 3000;

app.use(express.json());

// Connexion MongoDB
const uri =
  'mongodb+srv://username123:sami5058@cluster0.dy6dz3y.mongodb.net/TP3_Jonathan_Sami-main?retryWrites=true&w=majority&appName=Cluster0';

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};
mongoose.connect(uri, clientOptions).then(() => console.log('Connected to DB'));

// Routes
app.use('/api', MainRouter);
app.use('/users', userRouter);
app.use('/grimoires', grimoireRouter);
app.use(i18n.init);

// MIDDLEWARE
// MIDDLEWARE
app.use((err, req, res, next) => {
  console.error('Error caught:', err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
