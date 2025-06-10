import mongoose from 'mongoose';

const GrimoireSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  schools: {
    type: [String],
    default: [],
  },

  spells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spell', // ou 'Sort', selon ton modèle réel
    default: [],
  }],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Magician',
    default: null,
  },
});

const GrimoireModel = mongoose.models.Grimoire || mongoose.model('Grimoire', GrimoireSchema);
export default GrimoireModel;
