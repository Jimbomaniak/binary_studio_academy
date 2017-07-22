"use strict";
class Fighter {
    constructor(name, health, power) {
        this.name = name;
        this.health = health;
        this.power = power;
    }
    setDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
        console.log(`${this.name} health: ${this.health}`);
    }
    hit(enemy, point = 1) {
        let damage = this.power * point;
        enemy.setDamage(damage);
    }
    toString() {
        return `Fighter ${this.name} (${this.health})`;
    }
}
class ImprovedFighter extends Fighter {
    doubleHit(enemy, point = 1) {
        super.hit(enemy, point * 2);
    }
    toString() {
        return `Improved fighter ${this.name} (${this.health})`;
    }
}
function fight(fighter, improvedFighter, ...point) {
    console.log('Fight!');
    let randomPoint = () => point[Math.floor(Math.random() * point.length)];
    let doubleDamage = () => Math.round(Math.random());
    while (fighter.health > 0 && improvedFighter.health > 0) {
        fighter.hit(improvedFighter, randomPoint());
        if (improvedFighter.health > 0) {
            if (doubleDamage()) {
                console.log('Critical hit!');
                improvedFighter.doubleHit(fighter, randomPoint());
            }
            else {
                improvedFighter.hit(fighter, randomPoint());
            }
        }
    }
    let winner = fighter.health > 0 ? fighter : improvedFighter;
    console.log(`And the winner is ${winner.name}!`);
}
let madMax = new Fighter('Mad Max', 100, 1);
let subZero = new ImprovedFighter('Sub-Zero', 100, 1);
let point = [15, 19, 25, 10, 77, 30, 5, 7];
fight(madMax, subZero, ...point);
console.log(`Results:\n${madMax.toString()}\n${subZero.toString()}`);
//# sourceMappingURL=fightClub.js.map