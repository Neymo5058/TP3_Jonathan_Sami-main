class Spell {
  constructor(spellObj) {
    this.id = spellObj.id || spellObj._id || null;
    this.name = spellObj.name;
    this.level = spellObj.level;
    this.school = spellObj.school;
    this.effects = spellObj.effects || [];
  }

  toString() {
    return `${this.name}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      school: this.school,
      effects: this.effects,
    };
  }
}

export default Spell;
