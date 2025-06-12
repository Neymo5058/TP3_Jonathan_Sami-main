import mongoose from 'mongoose';
import SpellModel from './SpellModel.js';

const GrimoireSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    schools: { type: [String], required: true },
    spells: {
      type: [SpellModel.schema],
      default: [],
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Magician' },
  },
  { timestamps: true }
);
const GrimoireModel = mongoose.model('Grimoire', GrimoireSchema);
export default GrimoireModel;
