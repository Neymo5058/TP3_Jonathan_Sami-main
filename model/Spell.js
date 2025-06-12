import mongoose from 'mongoose';

class Spell {
  id;
  name;
  level;
  school;
  effects;
  power;

  constructor(SpellObj = {}) {
    this.id = SpellObj.id || SpellObj._id || null;
    this.name = SpellObj.name || 'Unknown spell';
    this.level = SpellObj.level || 1;
    this.school = SpellObj.school || 'Unknown school';
    this.effects = SpellObj.effects || [];
    this.power = SpellObj.power ?? Math.floor(Math.random() * 20) + 5;
  }
}
export default Spell;
