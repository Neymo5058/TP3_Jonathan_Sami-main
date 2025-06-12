import mongoose from 'mongoose';
const EffectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alignment: {
    type: [String],
    enum: ['good', 'bad', 'chaotic'],
  },
  school: {
    type: String,
    required: true,
    enum: [
      'University of Blackmagic',
      'University of Dark Arts',
      'University of Shadows',
      'University of Blood and Bone',
      'University of Occult Sciences',
      'University of Magical Sciences',
      'University of Secrets',
    ],
  },

  description: {
    type: Map,
    of: String,
    required: true,
  },
});

export default EffectSchema;
