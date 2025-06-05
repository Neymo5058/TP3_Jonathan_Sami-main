class Spell {
  constructor(spellObj) {
    this.id = spellObj.id || spellObj._id || null;
    this.name = spellObj.name;
    this.level = spellObj.level;
    this.school = spellObj.school;
    this.effects = spellObj.effects || [];
  }
}

export default Spell;
