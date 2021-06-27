/** @type {Phaser.Types.Core.GameConfig} */
const config = {
    parent: 'game',
    width: 800,
    height: 450,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    fps: {
        target: 30,
        min: 5
    },
    pixelArt: true,
    dom: {
        createContainer: true
    },
    input: {
        activePointers: 3
    },
    scene: [
        MainScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
}
new Phaser.Game(config);