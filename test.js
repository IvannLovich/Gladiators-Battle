const _ = require('lodash');

class Gladiator {
  constructor(life, damage, stamina) {
    this.life = life;
    this.damage = damage;
    this.stamina = stamina;
  }

  get life() {
    if (this._life < 0) {
      return 0;
    }
    return this._life;
  }

  set life(value) {
    if (typeof value !== 'number') {
      throw new Error('Life attribute must be a number');
    }
    this._life = value;
  }

  get damage() {
    return this._damage;
  }

  set damage(value) {
    if (typeof value !== 'number') {
      throw new Error('Damage attribute must be a number');
    }
    this._damage = value;
  }

  get stamina() {
    return this._stamina;
  }

  set stamina(value) {
    if (typeof value !== 'number') {
      throw new Error('Stamina attribute must be a number');
    }
    this._stamina = value;
  }
  attackAction(target, weapon) {
    if (weapon !== undefined) {
      if (target.defense > 0 || target.defense !== undefined) {
        if (this._damage > target.defense) {
          target.life = target.life + target.defense - this._damage;
          target.defense = 0;
        } else {
          target.defense -= this._damage;
        }
      } else if (this._damage > target.life) {
        target.life = 0;
      } else {
        target.life -= this._damage;
      }
    } else {
      throw new Error('You need an element to attack!');
    }
  }
}

class Warrior extends Gladiator {
  constructor(life, damage, stamina, defense) {
    super(life, damage, stamina);
    this.defense = defense;
  }
}

class Killer extends Gladiator {
  constructor(...args) {
    super(...args);
  }

  get damage() {
    return this._damage;
  }

  set damage(value) {
    if (typeof value !== 'number') {
      throw new Error('Damage attribute must be a number');
    }
    this._damage = value + 20;
  }
}

class Wizard extends Gladiator {
  constructor(life, damage, stamina, mana) {
    super(life, damage, stamina);
    this.mana = mana;
  }

  get damage() {
    return this._damage;
  }

  set damage(value) {
    if (typeof value !== 'number') {
      throw new Error('Damage attribute must be a number');
    }
    this._damage = value + 50;
  }

  get mana() {
    return this._mana;
  }

  set mana(value) {
    if (typeof value !== 'number') {
      throw new Error('Mana attribute must be a number');
    }
    this._mana = value;
  }

  getMedicine() {
    this._life += 2;
    return this._life;
  }
}

class Doctor extends Gladiator {
  constructor(life, damage, stamina, mana) {
    super(life, damage, stamina);
    this.mana = mana;
  }

  get life() {
    if (this._life < 0) {
      return 0;
    }
    return this._life;
  }

  set life(value) {
    if (typeof value !== 'number') {
      throw new Error('Life attribute must be a number');
    } else if (value > 25) {
      throw new Error("Life can't be > 25");
    }
    this._life = value;
  }

  get damage() {
    return this._damage;
  }

  set damage(value) {
    if (typeof value !== 'number') {
      throw new Error('Damage attribute must be a number');
    } else if (value > 10) {
      throw new Error("Damage can't be > 10");
    }
    this._damage = value;
  }

  get stamina() {
    return this._stamina;
  }

  set stamina(value) {
    if (typeof value !== 'number') {
      throw new Error('Stamina attribute must be a number');
    } else if (value > 8) {
      throw new Error("Stamina can't be > 8");
    }

    this._stamina = value;
  }

  get mana() {
    return this._mana;
  }

  set mana(value) {
    if (typeof value !== 'number') {
      throw new Error('Mana attribute must be a number');
    }
    this._mana = value;
  }

  getMedicine(target, tool) {
    if (tool !== undefined) {
      target.life += 10;
      return target.life;
    } else {
      throw new Error('Is necessary mana to heald');
    }
  }
}

const warrior = new Warrior(390, 100, 8, 80);
const kill = new Killer(400, 90, 20);
const wz = new Wizard(420, 110, 40, 10, 40);
const doc = new Doctor(25, 10, 8, 30);

const gladiators = [warrior, kill, wz, doc];

while (gladiators.length > 1) {
  const twoWarriors = _.sampleSize(gladiators, [(n = 2)]);
  console.log(twoWarriors);

  const random = Math.floor(Math.random() * Math.floor(2));
  const ifZeroOrOne = random === 0 ? random + 1 : random - 1;

  if (
    twoWarriors[random] instanceof Doctor ||
    twoWarriors[random] instanceof Wizard
  ) {
    twoWarriors[random].attackAction(
      twoWarriors[ifZeroOrOne],
      twoWarriors[random].mana,
    );
    if (twoWarriors[ifZeroOrOne] instanceof Wizard) {
      twoWarriors[ifZeroOrOne].life < 10 &&
        twoWarriors[ifZeroOrOne].getMedicine();
    }
  } else {
    twoWarriors[random].attackAction(
      twoWarriors[ifZeroOrOne],
      twoWarriors[random].stamina,
    );
  }

  if (twoWarriors[ifZeroOrOne].life === 0) {
    gladiators.splice(gladiators.indexOf(twoWarriors[ifZeroOrOne]), 1);
  }
}

console.log('The winning Gladiator is ===>', gladiators[0]);
