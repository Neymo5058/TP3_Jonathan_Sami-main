class Effect {
  constructor(effectObj) {
    this.id = effectObj.id || effectObj._id || null;
    this.description = effectObj.description;
    this.school = effectObj.school;
    this.types = effectObj.types || [];
  }

  toString() {
    return `${this.description}`;
  }

  toJSON() {
    return {
      id: this.id,
      description: this.description,
      school: this.school,
      types: this.types,
    };
  }
}

export default Effect;
