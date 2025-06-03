import mongoose from 'mongoose';

const GrimoireSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  schools: {
    type: [String],
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
    default: [],
  },
  spells: {
    type: [String],
    enum: [
      'Wingardium Leviosa',
      'Transfiguro',
      'Expelliarmus',
      'Felix Felicis',
      'Herbivicus',
      'The Grim Reveal',
      'Starflare',
      'Numeris Confundis',
      'Runica Unlocka',
      'Beastcall',
      'Goldtooth Brew',
      'Avada Kedavra',
    ],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Magician',
    default: null,
  },
});

const GrimoireModel = mongoose.models.Grimoire || mongoose.model('Grimoire', GrimoireSchema);

export default GrimoireModel;
