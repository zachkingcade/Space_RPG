class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {
        console.log("Boot Started");
        this.load.spritesheet("items", "./assets/images/rpg_items.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("gridBackground", "./assets/images/Panel_Dialogue.png" )
        this.load.image("platform", "./assets/images/ship.png" )
        this.load.image("blueSlime", "./assets/images/01_BigSlime_A.png" )
    }

    create() {
        this.scene.start("MainScene", {
            player: {
                health: 200,
                maxHealth: 200,
                baseDamage: 1,
                tileMod: 1.3,
            },
            level: 1
        });
    }
}