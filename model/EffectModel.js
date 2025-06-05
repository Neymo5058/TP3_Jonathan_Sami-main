import mongoose from 'mongoose';

const EffectSchema = new mongoose.Schema({
  description: { type: String, required: true },
  school: { type: String, required: true },
  types: [{ type: String }]
});

const EffectModel = mongoose.model('Effect', EffectSchema);
export default EffectModel;
