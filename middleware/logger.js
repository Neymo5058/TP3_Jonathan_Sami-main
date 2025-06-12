import { createLogger, transports } from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
});

export default logger;

//
// import logger from '../utils/logger.js';

// logger.info('Action réussie');
// logger.warn('Attention, quelque chose semble étrange');
// logger.error('Une erreur est survenue');
