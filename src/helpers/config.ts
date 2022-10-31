import {IConfig} from "../interfaces";

export const config: IConfig = {
    gameWidth: 800,
    gameHeight: 500,
    reelsPosition: {x: 225, y: 25},
    playButtonPosition: {x: 340, y: 375},
    FPSDisplayPosition: {x: 10, y: 10},
    winPosition: {x: 245, y: 125},
    totalReels: 3,
    reelSpinningCycles: 20,
    reelSpinningSpeedFactor: [25, 35, 30],
    reelShuffleSpinningSpeedFactor: true,
    totalReelCells: 3,
    reelVisibleCells: 3,
    reelCellHeight: 115.5,
    reelCellWidth: 115,
    reelVerticalPadding: 0,
    reelHorizontalMargin: 0,
    startMoney: 1000,
    moneyPosition: {x: 250, y: 410},
    leftButtonPosition: {x: 450, y: 425},
    rightButtonPosition: {x: 525, y: 425},
};
