import * as PIXI from 'pixi.js';

import {config} from './helpers';
import {FpsMeter, PlayButton, Reels, Money, Bet, BetButtonRight, BetButtonLeft} from './components';


const {gameWidth, gameHeight, winPosition} = config;

function createApplication(): PIXI.Application {
    const app = new PIXI.Application({
        backgroundColor: 0xd3d3d3,
        width: gameWidth,
        height: gameHeight
    });
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.renderer.view.style.position = 'absolute';
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    });
    return app;
}

function loadAssets(onComplete: () => void): void {
    const loader = PIXI.Loader.shared;
    loader.onComplete.once(onComplete);
    loader.load();
}

function render(app: PIXI.Application) {
    document.body.appendChild(app.view);
}

window.onload = () =>
    loadAssets(() => {
        const app = createApplication();
        const stage = app.stage;

        const button = new PlayButton(config);
        stage.addChild(button);

        const background = PIXI.Sprite.from('./images/background.png');
        background.x = 175;
        background.y = 8;
        stage.addChild(background);

        const reels = new Reels(config, app.ticker);
        stage.addChild(reels);

        const fpsDisplay = new FpsMeter(config, app.ticker);
        stage.addChild(fpsDisplay);

        const money = new Money(config);
        stage.addChild(money);

        const bet = new Bet(config);
        stage.addChild(bet);

        const leftButton = new BetButtonLeft(config.leftButtonPosition);
        stage.addChild(leftButton);

        const rightButton = new BetButtonRight(config.rightButtonPosition);
        stage.addChild(rightButton);

        const winLine = PIXI.Sprite.from('./images/winLine.png');
        winLine.x = winPosition.x;
        winLine.y = winPosition.y;


        button.on('click', function (this: PlayButton) {
            if (money.money - bet.bet >= 0) {
                stage.removeChild(winLine);
                money.money -= bet.bet;

                if (!reels.areSpinning()) {
                    this.setDisabled();
                    reels.startSpin();

                    setTimeout(() => {
                        reels.spin(() => {
                            this.setInactive();
                        }, winLine, stage, money, bet);
                    }, 900);
                }
            } else {
                this.setDisabled();
            }
        });

        leftButton.on('click', function (this: BetButtonLeft) {
            if (bet.bet > 10) {
                bet.minusBet();
                rightButton.setActive();
                if (bet.bet === 10) {
                    this.setDisabled();
                }
                if (bet.bet === money.money) {
                    button.setActive();
                }
            }
        });

        rightButton.on('click', function (this: BetButtonRight) {
            if (bet.bet < 100) {
                bet.plusBet();
                leftButton.setActive();
                if (bet.bet === 100) {
                    this.setDisabled();
                }
            }
        });

        render(app);
    });
