import mongoose from 'mongoose';
import EffectSchema from './EffectModel.js';

const SpellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: {
    type: String,
    required: true,
    enum: [
      'University of Blackmagic',
      'University of Dark Arts',
      'University of Shadows',
      'University of Blood and Bone',
      'University of Occult Sciences',
      'University of Magical Sciences',
      'University of Secrets',
    ],
  },
  effects: {
    type: [EffectSchema],
    default: [],
  },
  power: {
    type: Number,
    default: () => Math.floor(Math.random() * 20) + 5,
  },
});

const SpellModel = mongoose.model('Spell', SpellSchema);
export default SpellModel;
