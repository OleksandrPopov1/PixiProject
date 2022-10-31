import * as PIXI from 'pixi.js';


import {Button} from '../Button/Button';
import {IPoint} from "../../interfaces";

export class BetButtonRight extends Button {
    constructor(buttonPosition: IPoint) {
        super({
            activeTexture: PIXI.Texture.from('betButtonRightActive'),
            inactiveTexture: PIXI.Texture.from('betButtonRightInactive'),
            disabledTexture: PIXI.Texture.from('betButtonRightDisabled')
        });

        this.position.set(buttonPosition.x, buttonPosition.y);
    }
}

PIXI.Loader.shared.add('betButtonRightActive', `./images/rightArrow.png`);
PIXI.Loader.shared.add('betButtonRightInactive', `./images/rightArrow.png`);
PIXI.Loader.shared.add('betButtonRightDisabled', `./images/rightArrow.png`);
