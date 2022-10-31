import * as PIXI from 'pixi.js';

import {IConfig} from "../../interfaces";


export class FpsMeter extends PIXI.Container {
    protected textStyle: Partial<PIXI.TextStyle> = {
        fontSize: 20,
        fill: 'black',
    };

    constructor(config: IConfig, ticker: PIXI.Ticker) {
        super();
        this.position.set(config.FPSDisplayPosition.x, config.FPSDisplayPosition.y);
        const content = new PIXI.Text('', this.textStyle);
        this.addChild(content);

        setInterval(() => {
            const fps = ticker.FPS.toFixed(2);
            content.text = `FPS: ${fps}`;
        }, 1000);
    }
}
