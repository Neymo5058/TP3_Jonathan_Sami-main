class Magician {
  id;
  name;
  appearance;
  stats;
  level;
  schools;
  alignment;
  spellbooks;

  constructor(magicianObj) {
    this.id = magicianObj.id || magicianObj._id || null;
    this.name = magicianObj.name;

    this.appearance = {
      hair: {
        style: magicianObj.appearance?.hair?.style || null,
        color: magicianObj.appearance?.hair?.color || null,
      },
      beard: {
        style: magicianObj.appearance?.beard?.style || null,
        color: magicianObj.appearance?.beard?.color || null,
      },
      clothes: {
        robe: magicianObj.appearance?.clothes?.robe || null,
        hat: magicianObj.appearance?.clothes?.hat || null,
      },
      wand: {
        wood: magicianObj.appearance?.wand?.wood || null,
      },
    };

    this.stats = {
      strength: magicianObj.stats?.strength || null,
      agility: magicianObj.stats?.agility || null,
      endurance: magicianObj.stats?.endurance || null,
      Spell_Power: magicianObj.stats?.Spell_Power || null,
    };

    this.level = magicianObj.level ?? 1;
    this.schools = magicianObj.schools ?? [];
    this.alignment = magicianObj.alignment ?? 'Chaotic good';
    this.spellbooks = magicianObj.spellbooks ?? [];
  }

  toString() {
    return `${this.name}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      appearance: this.appearance,
      stats: this.stats,
      schools: this.schools,
      alignment: this.alignment,
      spellbooks: this.spellbooks,
    };
  }
}

export default Magician;
