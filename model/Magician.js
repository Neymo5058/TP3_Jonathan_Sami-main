import mongoose from 'mongoose';
import AppError from '../middleware/appError.js';
import logger from '../middleware/logger.js';
import MagicianModel from '../model/MagicianModel.js';
import SpellModel from './SpellModel.js';

class Magician {
  id;
  name;
  appearance;
  stats;
  level;
  schools;
  alignment;
  spellbooks;
  spells;

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
      spellPower: magicianObj.stats?.spellPower || null,
    };

    this.level = magicianObj.level ?? 1;
    this.schools = magicianObj.schools ?? [];
    this.alignment = Array.isArray(magicianObj.alignment) ? magicianObj.alignment : ['chaotic', 'good'];
    this.spellbooks = magicianObj.spellbooks ?? [
      {
        title: 'Default Grimoire',
        spells: [],
        level: 1,
      },
    ];
    this.spells = magicianObj.spells ?? [];
  }
  toString() {
    return `${this.title} (Level ${this.level}) - ${this.alignment}`;
  }
  // TODO
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      appearance: this.appearance,
      stats: this.stats,
      level: this.level,
      schools: this.schools,
      alignment: this.alignment,
      spellbooks: this.spellbooks,
      spells: this.spells,
    };
  }

  createSpell(input = {}, grimoireTitle = 'Default Grimoire') {
    const names = ['Fireball', 'Wall of Ice', 'Teleport', 'Heal', 'Shield', 'Shockwave', 'Life Drain'];
    const name = input.name || names[Math.floor(Math.random() * names.length)];

    if (!this.schools.length) {
      throw new AppError('This magician has no schools.', 400);
    }
    const school = input.school || this.schools[Math.floor(Math.random() * this.schools.length)];

    const level = input.level != null ? input.level : Math.floor(Math.random() * this.level) + 1;

    if (!this.schools.includes(school)) {
      logger.warn('Invalid school');
      throw new AppError(`School does not belong to magician`, 400);
    }

    if (level > this.level) {
      throw new AppError(`Spell level is too high!`, 400);
    }

    let effects = [];
    for (let i = 0; i < level; i++) {
      effects.push({
        description: `Effect ${i + 1}`,
        school,
        alignment: ['good', 'chaotic'],
      });
    }
    const power = input.power ?? Math.floor(Math.random() * 30) + 10;

    const newSpell = {
      id: new mongoose.Types.ObjectId().toString(),
      name,
      school,
      level,
      effects,
      power,
      createdAt: new Date(),
    };

    const grimoire = this.getGrimoire(grimoireTitle);
    if (!grimoire) {
      throw new AppError(`Grimoire not found.`, 404);
    }
    grimoire.spells.push(newSpell);
    logger.info('Spell created in Grimoire');

    return newSpell;
  }
  getAllGrimoires() {
    return this.spellbooks ?? [];
  }

  getSpell(spellName) {
    for (const grimoire of this.spellbooks) {
      const spell = grimoire.spells.find((spell) => spell.name === spellName);
      if (spell) return spell;
    }
    return null;
  }

  static createGrimoire({ title = null, owner, schools = [], level = 1 }) {
    const grimoireNames = [
      'Tome of Whispered Runes',
      'Grimoire of the Veiled Moon',
      'Codex Arcanum',
      'The Emberbound Grimoire',
      'Grimoire of the Hollow Eye',
    ];

    const name = title || grimoireNames[Math.floor(Math.random() * grimoireNames.length)];

    return {
      name,
      owner,
      schools,
      level,
      spells: [],
    };
  }

  static SpellAttack(spell, target) {
    if (!spell) {
      throw new AppError('Spell is undefined or has no power.', 400);
    }

    const defense = target?.resistance ?? 0;
    const damage = Math.max(0, spell.power - defense);

    logger.info(`Spell make damage} : ${damage}`);

    return { message: 'success', damage, spell, target };
  }

  acquireGrimoire(grimoire) {
    if (!grimoire?._id) throw new AppError('Invalid grimoire.', 400);

    const alreadyOwned = this.spellbooks.some(
      (g) => g._id?.toString() === grimoire._id.toString() || g.name === grimoire.name
    );

    if (alreadyOwned) {
      throw new AppError('Already acquired ', 400);
    }

    this.spellbooks.push({
      title: grimoire.name ?? 'Untitled Grimoire',
      spells: grimoire.spells ?? [],
      level: grimoire.level ?? 1,
    });
  }
  async castSpell(grimoire) {
    if (!grimoire) {
      throw new AppError('Grimoire does not exist.', 404);
    }
    const spellGrimoires = await SpellModel.find({
      _id: { $in: grimoire.spells },
    });
  }
}

export default Magician;
