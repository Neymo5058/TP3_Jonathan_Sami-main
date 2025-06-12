import mongoose from 'mongoose';
import AppError from '../utils/appError.js';
import logger from '../utils/logger.js';

class Grimoire {
  id;
  name;
  schools;
  spells;
  owner;
  constructor(grimoireObj = {}) {
    this.id = grimoireObj.id || grimoireObj._id || null;
    this.name = grimoireObj.name || 'Undefined Grimoire';
    this.schools = grimoireObj.schools || [];
    this.spells = grimoireObj.spells || [];
    this.owner = grimoireObj.owner || null;
  }

  addSpell(spellData = {}) {
    if (!spellData.school && !this.schools.length) {
      throw new AppError('No school available for this spell.', 400);
    }
    const school = spellData.school || this.schools[0];

    const newSpell = {
      id: new mongoose.Types.ObjectId().toString(),
      name: spellData.name || 'Unnamed Spell',
      school,
      level: spellData.level || 1,
      effects: spellData.effects || [],
      power: spellData.power || 10,
      createdAt: new Date(),
    };

    this.spells.push(newSpell);
    logger.info(`Spell added to grimoire`);

    return newSpell;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      schools: this.schools,
      spells: this.spells,
      owner: this.owner,
      spellCount: this.spellCount,
    };
  }
  toString() {
    return this.name;
  }
}
export default Grimoire;
