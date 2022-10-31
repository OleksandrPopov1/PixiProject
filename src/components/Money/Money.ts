import * as PIXI from 'pixi.js';

import {IConfig} from "../../interfaces";
import {config} from "../../helpers";

const {startMoney} = config;

export class Money extends PIXI.Container{
    public money: number;
    protected textStyle: Partial<PIXI.TextStyle> = {
        fontSize: 20,
        fill: 'black',
    };

    constructor(config: IConfig) {
        super();
        this.money = startMoney;
        this.position.set(config.moneyPosition.x, config.moneyPosition.y);
        const content = new PIXI.Text('', this.textStyle);
        this.addChild(content);

        setInterval(() => {
            content.text = `Money: \n${this.money}`;
        }, 500);
    }
}
