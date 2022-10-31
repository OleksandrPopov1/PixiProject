import * as PIXI from 'pixi.js';

import {Reel} from '../Reel/Reel';
import {IConfig} from "../../interfaces";
import {Bet} from "../Bet/Bet";
import {Money} from "../Money/Money";

function shuffle(set: number[]) {
    for (let i = set.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [set[i], set[j]] = [set[j], set[i]];
    }
}

export class Reels extends PIXI.Container {
    protected items: Reel[] = [];

    protected totalReels: number;

    protected spinningSpeedFactor: number[];

    protected spinning = false;

    protected shuffleSpinningSpeedFactor: boolean;

    protected rolledDiceOutcome: number = -1;

    constructor(config: IConfig, ticker: PIXI.Ticker) {
        super();
        this.totalReels = config.totalReels;
        this.spinningSpeedFactor = [...config.reelSpinningSpeedFactor];
        this.shuffleSpinningSpeedFactor = config.reelShuffleSpinningSpeedFactor;
        this.position.set(config.reelsPosition.x, config.reelsPosition.y);
        Reel.totalCells = config.totalReelCells;
        for (let index = 0; index < this.totalReels; index = index + 1) {
            const reel = new Reel(index, config, ticker);
            this.items.push(reel);
            this.addChild(reel);
        }
    }

    startSpin() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].startSpin();
        }
    }


    spin(cb: Function, winLine: PIXI.Sprite, stage: PIXI.Container, money: Money, bet: Bet) {
        this.spinning = true;
        let spinningReelsNumber = this.totalReels;
        const onStop = () => {
            spinningReelsNumber -= 1;
            if (!spinningReelsNumber) {
                cb();
                this.spinning = false;
                this.checkResults(winLine, stage, money, bet);
            }
        };

        if (this.shuffleSpinningSpeedFactor) {
            shuffle(this.spinningSpeedFactor);
        }

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].spin(-1, this.spinningSpeedFactor[i], onStop);
        }
    }

    areSpinning() {
        return this.spinning;
    }

    protected checkResults(winLine: PIXI.Sprite, stage: PIXI.Container, money: Money, bet: Bet): void {
        let won = this.rolledDiceOutcome >= 0;
        if (!won) {
            const outcome = this.items[0].getSpinningOutcome();
            won = this.items.find((i) => i.getSpinningOutcome() !== outcome) === undefined;
        }
        if (won) {
            money.money += bet.bet * 2;
            stage.addChild(winLine)
        }
    }
}

