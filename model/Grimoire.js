class Grimoire {
  id;
  tile;
  schools;
  spells;
  owner;
  constructor(grimoireObj = {}) {
    this.id = grimoireObj.id || grimoireObj._id || null;
    this.title = grimoireObj.name || 'Undefined Grimoire';
    this.schools = grimoireObj.schools || [];
    this.spells = grimoireObj.spells || [];
    this.owner = grimoireObj.owner || null;
  }

  toString() {
    return `${this.title}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.title,
      schools: this.schools,
      spells: this.spells,
      owner: this.owner,
    };
  }
}

export default Grimoire;
