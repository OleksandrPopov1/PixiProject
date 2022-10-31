import * as PIXI from 'pixi.js';

import {IButton} from "../../interfaces";


export class Button extends PIXI.Sprite {
    protected activeTexture: PIXI.Texture;
    protected inactiveTexture: PIXI.Texture;
    protected disabledTexture: PIXI.Texture;

    constructor(params: IButton) {
        super();
        this.activeTexture = params.activeTexture;
        this.inactiveTexture = params.inactiveTexture;
        this.disabledTexture = params.disabledTexture;
        this.buttonMode = true;
        this.setInactive();
    }

    setActive() {
        this.texture = this.activeTexture;
        this.interactive = true;
    }

    setInactive() {
        this.texture = this.inactiveTexture;
        this.interactive = true;
    }

    setDisabled() {
        this.texture = this.disabledTexture;
        this.interactive = false;
    }
}
