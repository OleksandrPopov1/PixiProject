import * as PIXI from 'pixi.js';


import {Button} from '../Button/Button';
import {IPoint} from "../../interfaces";

export class BetButtonLeft extends Button {
    constructor(buttonPosition: IPoint ) {
        super({
            activeTexture: PIXI.Texture.from('betButtonLeftActive'),
            inactiveTexture: PIXI.Texture.from('betButtonLeftInactive'),
            disabledTexture: PIXI.Texture.from('betButtonLeftDisabled')
        });
        this.position.set(buttonPosition.x, buttonPosition.y);
    }
}

PIXI.Loader.shared.add('betButtonLeftActive', `./images/leftArrow.png`);
PIXI.Loader.shared.add('betButtonLeftInactive', `./images/leftArrow.png`);
PIXI.Loader.shared.add('betButtonLeftDisabled', `./images/leftArrow.png`);
