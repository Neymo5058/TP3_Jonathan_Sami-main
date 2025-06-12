import mongoose from 'mongoose';
const SpellbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: Number, default: 1 },
  spells: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Spell',
    default: [],
  },
});

const MagicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appearance: {
    hair: {
      style: { type: String },
      color: { type: String },
    },
    beard: {
      style: { type: String },
      color: { type: String },
    },
    clothes: {
      robe: { type: String },
      hat: { type: String },
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
    type: [String],
    default: ['chaotic good'],
  },
  spellbooks: {
    type: [SpellbookSchema],
    default: [],
  },
});

const MagicianModel = mongoose.model('Magician', MagicianSchema);
export default MagicianModel;
