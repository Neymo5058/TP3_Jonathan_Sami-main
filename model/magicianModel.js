import mongoose from 'mongoose';

const MagicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appearance: {
    hair: { style: String, color: String },
    beard: { style: String, color: String },
    clothes: { robe: String, hat: String },
    wand: { wood: String },
  },
  stats: {
    strength: Number,
    agility: Number,
    endurance: Number,
    Spell_Power: Number,
  },
  level: { type: Number, default: 1 },
  schools: [String],
  alignment: { type: String, default: 'Chaotic good' },
  spellbooks: [
    {
      name: String,
      spells: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }],
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // ← Si tu veux savoir qui l'a créé
});

const MagicianModel = mongoose.models.Magician || mongoose.model('Magician', MagicianSchema);
export default MagicianModel;
