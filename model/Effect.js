import mongoose from 'mongoose';
import Effect from './EffectModel.js';

class Effects {
  id;
  description;
  school;
  types;
  constructor(effectObj) {
    this.id = effectObj.id || effectObj._id || null;
    this.description = effectObj.description || '';
    this.school = effectObj.school || '';
    this.types = Array.isArray(effectObj.types) ? effectObj.types : [];
    constructor(effectObj);
    this.id = effectObj.id || effectObj._id || null;
    this.description = effectObj.description || '';
    this.school = effectObj.school || '';
    this.types = Array.isArray(effectObj.types) ? effectObj.types : [];

    // Utiliser switch sur le premier type trouvé
    switch (this.types[0]) {
      case 'Good':
        console.log('Ce sor.');
        break;
      case 'Bad':
        console.log('Ce sort est maléfique.');
        break;
      case 'Chaotic':
        throw message('');
        break;
      default:
        '';
        console.log('Type de sort inconnu.');
    }
  }
}

const Effect = mongoose.model('Effect', effectmodel);
export default Effect;

//  good: Boolean(effectObj.good),
//     bad: Boolean(effectObj.bad),
//     chaotic: Boolean(effectObj.chaotic),
