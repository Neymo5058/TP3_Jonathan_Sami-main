import mongoose from 'mongoose';

const EffectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  types: {
    type: [String],
    enum: ['damage', 'heal', 'buff', 'debuff'],
    default: [],
  },
  school: {
    type: String,
    enum: [
      'Charms',
      'Transfiguration',
      'Defense Against the Dark Arts',
      'Potions',
      'Herbology',
      'Divination',
      'Astronomy',
      'Arithmancy',
      'Ancient Runes',
      'Care of Magical Creatures',
      'Alchemy',
      'Dark Arts',
    ],
    required: true,
  },
});

const EffectModel = mongoose.models.Effect || mongoose.model('Effect', EffectSchema);
export default EffectModel;
