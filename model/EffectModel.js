import mongoose from 'mongoose';
import validator from 'validator';
import EffectModel from './EffectModel.js';

const EffectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default EffectSchema;
