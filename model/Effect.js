class Effect {
  constructor(effectObj) {
    this.id = effectObj.id || effectObj._id || null;
    this.description = effectObj.description;
    this.school = effectObj.school;
    this.types = effectObj.types || [];
  }
}

export default Effect;
