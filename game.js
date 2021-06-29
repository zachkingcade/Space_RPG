/** @type {Phaser.Types.Core.GameConfig} */
const config = {
    parent: 'game',
    width: 450,
    height: 800,
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
        Boot,
        MainScene,
        Upgrade,
        Story
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
}
new Phaser.Game(config);