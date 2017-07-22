class Fighter{
    constructor(name, health, power){
        this._name = name;
        this._health = health;
        this._power = power;
    }

    setDamage(damage){
        this._health -= damage;
        if (this._health < 0){
            this._health = 0;
        }
        console.log(`${this._name} health: ${this._health}`);
    }

    hit(enemy, point = 1){
        let damage = this._power * point;
        enemy.setDamage(damage);
    }

    toString(){
        return `Fighter ${this._name} (${this._health})`;
    }
}

class ImprovedFighter extends Fighter{
    doubleHit(enemy, point = 1){
        super.hit(enemy, point * 2);
    }

    toString(){
        return `Improved fighter ${this._name} (${this._health})`;
    }
}

function fight(fighter, iFighter, ...point){
    console.log('Fight!');
    
    let randomPoint = () => point[Math.floor(Math.random() * point.length)];
    let doubleDamage = () => Math.round(Math.random());

    while (fighter._health > 0 && iFighter._health > 0){
        fighter.hit(iFighter, randomPoint());
        if (iFighter._health > 0){
            if (doubleDamage()){
                console.log('Critical hit!');
                iFighter.doubleHit(fighter, randomPoint());
            } else {
                iFighter.hit(fighter, randomPoint());
            }
        }
    }

    let winner = fighter._health > 0 ? fighter : iFighter;
    console.log(`And the winner is ${winner._name}!`);
}

let madMax = new Fighter('Mad Max', 100, 1);
let subZero = new ImprovedFighter('Sub-Zero', 100, 1);
let point = [15, 19, 25, 10, 77, 30, 5, 7];

fight(madMax, subZero, ...point);

console.log(`Results:\n${madMax.toString()}\n${subZero.toString()}`);
