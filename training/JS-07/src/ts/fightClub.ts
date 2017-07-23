
import Fighter from './fighter'
import ImprovedFighter from './improvedFighter'

class Fight {
    static fight(fighter: Fighter, improvedFighter: ImprovedFighter, ...point: number[]){
        let page: any = (document.getElementsByClassName('container__fight')[0] as HTMLDivElement);
        Fight._message(`${fighter.toString()} vs ${improvedFighter.toString()}`, page);
        Fight._message(`Let the fight begin!`, page);

        while (fighter.health > 0 && improvedFighter.health > 0){
            let hitF = fighter.hit(improvedFighter, Fight._getRandomPoint(point));
            Fight._message(hitF, page);
            if (improvedFighter.health > 0){
                if (Fight._isDouble()){
                    let hitDD = improvedFighter.doubleHit(fighter, Fight._getRandomPoint(point));
                    Fight._message(`Critical hit! ${hitDD}`, page);
                } else {
                    let hitI = improvedFighter.hit(fighter, Fight._getRandomPoint(point));
                    Fight._message(`${hitI}`, page);
                }
            }
        }

        let winner = fighter.health > 0 ? fighter : improvedFighter;
        Fight._message(`And the winner is ${winner.name}!`, page);
        Fight._message(`${fighter.toString()} | ${improvedFighter.toString()}`, page);
    }

    private static _isDouble(): number {
        return Math.round(Math.random());
    }

    private static _getRandomPoint(points: number[]): number {
        return points[Math.floor(Math.random() * points.length)];
    }

    private static _message(text: string, el: any) {
        let message = document.createElement('div');
        message.classList.add('fight__message');
        message.innerHTML = text;
        el.appendChild(message);
    }
}

let madMax = new Fighter('Mad Max', 100, 1);
let subZero  = new ImprovedFighter('Sub-Zero', 100, 1);
let point = [15, 19, 25, 10, 77, 30, 5, 7];

Fight.fight(madMax, subZero, ...point);
