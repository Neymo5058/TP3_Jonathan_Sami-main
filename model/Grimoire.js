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

  toString() {
    return `${this.name}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      schools: this.schools,
      spells: this.spells,
      owner: this.owner,
    };
  }
}

export default Grimoire;
