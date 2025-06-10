import mongoose from 'mongoose';

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
    this.spellbooks = magicianObj.spellbooks ?? [
      {
        title: 'Default Grimoire',
        spells: [],
      },
    ];
    this.spells = magicianObj.spells ?? [];
  }
  createSpell() {
    const spellNames = ['Fireball', 'Wall of Ice', 'Teleport', 'Heal', 'Shield', 'Shockwave', 'Life Drain'];
    const randomName = spellNames[Math.floor(Math.random() * spellNames.length)];
    TODO;
    const newSpell = {
      id: new mongoose.Types.ObjectId().toString(),
      name: randomName,
      power: Math.floor(Math.random() * 50) + 10,
    };

    this.spells.push(newSpell);
    return newSpell;
  }
  static async createGrimoire() {
    const grimoireName = [
      'Grimoire of Shifting Stars',
      'Tome of Whispered Runes',
      'Grimoire of the Veiled Moon',
      'Codex Arcanum',
      'The Emberbound Grimoire',
      'Grimoire of the Hollow Eye',
      'Scrolls of the Broken Sigil',
      'Grimoire of Frost and Ash',
    ];

    const GrimoireNames = ['Fireball', 'Wall of Ice', 'Teleport', 'Heal', 'Shield', 'Shockwave', 'Life Drain'];
    const randomGrimoire = spellNames[Math.floor(Math.random() * spellNames.length)];
    const newGrimoire = {
      id: new mongoose.Types.ObjectId().toString(),
      name: randomName,
      schools,
    };
    this.schools.push(newGrimoire);
  }
  // TODO
  createGrimoire() {
    // cons
  }
}

export default Magician;
