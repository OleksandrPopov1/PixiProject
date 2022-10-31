import * as PIXI from 'pixi.js';

import {IConfig} from "../../interfaces";


export class Bet extends PIXI.Container {
    public bet: number;
    protected textStyle: Partial<PIXI.TextStyle> = {
        fontSize: 20,
        fill: 'black',
    };

    constructor(config: IConfig) {
        super();
        this.bet = 50
        this.position.set(config.moneyPosition.x + 230, config.moneyPosition.y);
        const content = new PIXI.Text('', this.textStyle);
        this.addChild(content);

        setInterval(() => {
            content.text = `BET: \n${this.bet}`;
        }, 500);
    }

    plusBet() {
        this.bet += 10;
    }

    minusBet() {
        this.bet -= 10;
    }
}
