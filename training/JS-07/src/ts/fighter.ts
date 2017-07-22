export interface IFighter {
    readonly name: string,
    health: number,
    power: number,

    setDamage(damage: number): void;
    hit(enemy: Fighter, point: number): void;
    toString(): string;
}

export default class Fighter implements IFighter{
    name: string;
    health: number;
    power: number;

    constructor(name: string, health: number, power: number){
        this.name = name;
        this.health = health;
        this.power = power;
    }

    setDamage(damage: number): string{
        this.health -= damage;
        if (this.health < 0){
            this.health = 0;
        }
        return `${this.name} health: ${this.health}`;
    }

    hit(enemy: Fighter, point: number = 1): string{
        let damage = this.power * point;
        let result = enemy.setDamage(damage);
        return `${this.name} hit ${enemy.name} by ${damage}. ${result}`;
    }

    toString(): string{
        return `Fighter ${this.name} (${this.health})`;
    }
}