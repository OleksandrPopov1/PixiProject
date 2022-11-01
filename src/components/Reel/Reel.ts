import * as PIXI from 'pixi.js';

import {IConfig} from "../../interfaces";


export class Reel extends PIXI.TilingSprite {
    protected spinningOutcome: number;

    protected spinningCycles: number;

    protected spinningCyclesMeter: number;

    protected reelIndex: number;

    protected horizontalMargin: number;

    protected verticalPadding: number;

    protected cellHeight: number;

    protected startSpinValue: number;

    protected appTicker: PIXI.Ticker;

    static totalCells: number = 0;

    constructor(reelIndex: number, config: IConfig, ticker: PIXI.Ticker) {
        const texture = PIXI.Texture.from('reelCellsImg');
        const {
            reelCellHeight,
            reelVisibleCells,
            reelVerticalPadding,
            reelCellWidth,
            reelHorizontalMargin,
            reelSpinningCycles
        } = config;
        const reelHeight = reelCellHeight * reelVisibleCells + reelVerticalPadding;
        super(texture, reelCellWidth, reelHeight);
        this.appTicker = ticker;
        this.spinningOutcome = 0;
        this.cellHeight = reelCellHeight;
        this.horizontalMargin = reelHorizontalMargin;
        this.spinningCycles = reelSpinningCycles;
        this.verticalPadding = reelVerticalPadding;
        this.reelIndex = reelIndex;
        this.spinningCyclesMeter = 0;
        this.startSpinValue = 0;
        this.setTilePositionAt(Reel.getRandomOutcome());
        this.setPosition();
    }

    protected setPosition() {
        this.x = this.reelIndex * (this.width + this.horizontalMargin);
        this.y = 0;
    }

    protected setTilePositionAt(cellNumber: number) {
        this.tilePosition.x = 0;
        this.tilePosition.y = -cellNumber * this.cellHeight + Math.ceil(this.verticalPadding / 2);
    }

    protected resetSpinningMeter() {
        this.spinningCyclesMeter = this.spinningCycles * this.cellHeight * Reel.totalCells;
    }

    protected setSpinningOutcome(useOutcome: number) {
        this.spinningOutcome = useOutcome >= 0 ? useOutcome : Reel.getRandomOutcome();
        this.setTilePositionAt(this.spinningOutcome);
        this.resetSpinningMeter();
    }

    getSpinningOutcome() {
        return this.spinningOutcome;
    }

    startSpin() {
        const animation = () => {
            if (this.startSpinValue < 50) {
                this.tilePosition.y -= 1;
                this.spinningCyclesMeter -= 5;
                this.startSpinValue++;
            } else {
                this.appTicker.remove(animation);
                this.startSpinValue = 0;
            }
        };

        this.appTicker.add(animation);
    }

    spin(useOutcome: number, spinningSpeedFactor: number, cb: Function) {
        this.setSpinningOutcome(useOutcome);
        this.tilePosition.y += 80;
        const animation = () => {
            if (this.spinningCyclesMeter > 0) {
                if (this.spinningCyclesMeter < 500){
                    this.tilePosition.y += 5;
                    this.spinningCyclesMeter -= 5;
                } else if(this.spinningCyclesMeter < 1000){
                    this.tilePosition.y += 10;
                    this.spinningCyclesMeter -= 10;
                } else if(this.spinningCyclesMeter < 1500){
                    this.tilePosition.y += 15;
                    this.spinningCyclesMeter -= 15;
                }else {
                    this.tilePosition.y += spinningSpeedFactor;
                    this.spinningCyclesMeter -= spinningSpeedFactor;
                }
            } else if (this.spinningCyclesMeter <= 0) {
                if (this.spinningCyclesMeter < 0) {
                    this.tilePosition.y += this.spinningCyclesMeter;
                    this.spinningCyclesMeter = 0;
                }
                this.appTicker.remove(animation);
                cb();
            }
        };
        this.appTicker.add(animation);
    }

    protected static getNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected static getRandomOutcome() {
        return Reel.getNumberBetween(0, Reel.totalCells - 1);
    }
}

PIXI.Loader.shared.add('reelCellsImg', './images/slot.png');

