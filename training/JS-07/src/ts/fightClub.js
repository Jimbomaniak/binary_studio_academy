"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fighter_1 = require("./fighter");
const improvedFighter_1 = require("./improvedFighter");
class Fight {
    static fight(fighter, improvedFighter, ...point) {
        let page = document.getElementsByClassName('container__fight')[0];
        Fight._message(`${fighter.toString()} vs ${improvedFighter.toString()}`, page);
        Fight._message(`Let the fight begin!`, page);
        while (fighter.health > 0 && improvedFighter.health > 0) {
            let hitF = fighter.hit(improvedFighter, Fight._getRandomPoint(point));
            Fight._message(hitF, page);
            if (improvedFighter.health > 0) {
                if (Fight._isDouble()) {
                    let hitDD = improvedFighter.doubleHit(fighter, Fight._getRandomPoint(point));
                    Fight._message(`Critical hit! ${hitDD}`, page);
                }
                else {
                    let hitI = improvedFighter.hit(fighter, Fight._getRandomPoint(point));
                    Fight._message(`${hitI}`, page);
                }
            }
        }
        let winner = fighter.health > 0 ? fighter : improvedFighter;
        Fight._message(`And the winner is ${winner.name}!`, page);
        Fight._message(`${fighter.toString()} | ${improvedFighter.toString()}`, page);
    }
    static _isDouble() {
        return Math.round(Math.random());
    }
    static _getRandomPoint(points) {
        return points[Math.floor(Math.random() * points.length)];
    }
    static _message(text, el) {
        let message = document.createElement('div');
        message.classList.add('fight__message');
        message.innerHTML = text;
        el.appendChild(message);
    }
}
let madMax = new fighter_1.default('Mad Max', 100, 1);
let subZero = new improvedFighter_1.default('Sub-Zero', 100, 1);
let point = [15, 19, 25, 10, 77, 30, 5, 7];
Fight.fight(madMax, subZero, ...point);
//# sourceMappingURL=fightClub.js.map