import * as PIXI from 'pixi.js';

import {IConfig} from "../../interfaces";
import {Button} from '../Button/Button';


export class PlayButton extends Button {
    constructor(config: IConfig) {
        super({
            activeTexture: PIXI.Texture.from('playButtonActive'),
            inactiveTexture: PIXI.Texture.from('playButtonInactive'),
            disabledTexture: PIXI.Texture.from('playButtonDisabled')
        });
        this.position.set(config.playButtonPosition.x, config.playButtonPosition.y);
    }
}

PIXI.Loader.shared.add('playButtonActive', './images/spin.png');
PIXI.Loader.shared.add('playButtonInactive', './images/spin.png');
PIXI.Loader.shared.add('playButtonDisabled', './images/spin.png');

