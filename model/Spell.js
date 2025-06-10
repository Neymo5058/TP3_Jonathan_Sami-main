import mongoose from 'mongoose';
class Spell {
  id;
  name;
  level;
  school;
  effects;

  constructor(SpellObj) {
    this.id = SpellObj.id || SpellObj._id || null;
    this.name = SpellObj.name;
    this.level = SpellObj.level || 1;
    this.school = SpellObj.school || 'Not specified';
    this.effects = SpellObj.effects || [];
  }
}

export default Spell;
