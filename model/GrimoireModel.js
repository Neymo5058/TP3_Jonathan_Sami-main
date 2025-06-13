import mongoose from 'mongoose';

const GrimoireSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },

    schools: {
      type: [String],
      default: [],
    },

    spells: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spell',
        default: [],
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Magician',
      default: null,
    },
  },
  { timestamps: true }
);
const GrimoireModel = mongoose.model('Grimoire', GrimoireSchema);
export default GrimoireModel;
