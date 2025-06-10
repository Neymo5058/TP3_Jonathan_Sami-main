import mongoose from 'mongoose';
import validator from 'validator';
import Spell from './Spell.js';
import { type } from 'os';

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
  effects: { type: String, default: [] },
});

const SpellModel = mongoose.model('Spell', SpellModel);

export default SpellModel;
