import mongoose from 'mongoose';
import EffectModel from './EffectModel.js';
import logger from '../utils/logger.js';

class Effect {
  id;
  description;
  school;
  alignment;
  constructor(effectObj) {
    this.id = effectObj.id || effectObj._id || null;
    this.description = effectObj.description || '';
    this.school = effectObj.school || '';
    this.alignment = Array.isArray(effectObj.alignment) ? effectObj.alignment : [];
    const Type1 = this.alignment?.[0]?.toLowerCase();
    switch (Type1) {
      case 'good':
        logger.info('This spell is full of benefits');
        break;
      case 'bad':
        logger.warn('This spell is dangerous.');
        break;
      case 'chaotic':
        logger.error('chaotic spell!');
        throw new Error('chaotic spell.');
      default:
        logger.info('Spell not defined');
        break;
    }
  }
}

const Effect = mongoose.model('Effect', EffectModel);

export default Effect;
