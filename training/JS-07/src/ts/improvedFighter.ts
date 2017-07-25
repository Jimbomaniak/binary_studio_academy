import Fighter from './fighter'
import {IFighter} from "./fighter"

export default class ImprovedFighter extends Fighter{
    doubleHit(enemy: IFighter, point: number = 1): string{
        return super.hit(enemy, point * 2);
    }

    toString(): string{
        return `Improved fighter ${this.name} (${this.health})`;
    }
}
