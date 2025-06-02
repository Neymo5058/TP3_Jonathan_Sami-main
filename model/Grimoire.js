import Magician from './Magician.js';

class Grimoire {
  constructor(grimoireObj) {
    this.id = grimoireObj.id || grimoireObj._id || null;
    this.name = grimoireObj.name;
    this.schools = grimoireObj.schools || [];
    this.spells = grimoireObj.spells || [];
    this.owner = grimoireObj.owner || null;
  }
}
