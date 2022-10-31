export interface IPoint {
    x: number;
    y: number;
}

export interface IConfig {
    gameWidth: number;
    gameHeight: number;
    reelsPosition: IPoint;
    playButtonPosition: IPoint;
    FPSDisplayPosition: IPoint;
    winPosition: IPoint;
    totalReels: number;
    reelSpinningCycles: number;
    reelSpinningSpeedFactor: number[];
    reelShuffleSpinningSpeedFactor: boolean;
    totalReelCells: number;
    reelCellHeight: number;
    reelCellWidth: number;
    reelVisibleCells: number;
    reelVerticalPadding: number;
    reelHorizontalMargin: number;
    startMoney: number;
    moneyPosition: IPoint;
    leftButtonPosition: IPoint;
    rightButtonPosition: IPoint;
}
