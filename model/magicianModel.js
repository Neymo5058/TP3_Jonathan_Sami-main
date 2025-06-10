import mongoose from 'mongoose';

const MagicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appearance: {
    hair: {
      style: { type: String, required: true },
      color: { type: String, required: true },
    },
    beard: {
      style: { type: String, required: true },
      color: { type: String, required: true },
    },
    clothes: {
      robe: { type: String, required: true },
      hat: { type: String, required: true },
    },
    wand: {
      wood: { type: String },
    },
  },
  stats: {
    strength: { type: Number },
    agility: { type: Number },
    endurance: { type: Number },
    spellPower: { type: Number },
  },
  level: {
    type: Number,
    default: 1,
  },
  schools: {
    type: [String],
    default: [],
  },
  alignment: {
    type: String,
    default: 'Chaotic good',
  },
  spellbooks: {
    type: [String],
    default: [],
  },
});

const MagicianModel = mongoose.model('Magician', MagicianSchema);
export default MagicianModel;
