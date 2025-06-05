import mongoose from 'mongoose';

const SpellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  effects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Effect' }]
});

const SpellModel = mongoose.model('Sort', SpellSchema);
export default SpellModel;
