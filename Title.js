class Title extends Phaser.Scene {

    constructor() {
        super("Title")
    }

    preload() {
        this.load.html("button", "./assets/menus/button.html");
    }

    create() {
        this.sound.stopAll();
        this.sound.play("titleMusic", {
            volume: .35,
            loop: true
        })
        let menu = this.add.dom(300, 400).createFromCache("button");
        let playButtonEl = menu.parent.querySelector("#play");
        let tutorialButtonEl = menu.parent.querySelector("#tutorial");
        let creditsButtonEl = menu.parent.querySelector("#credits");

        playButtonEl.addEventListener('click', () => {
            this.scene.start("Saves", {
            });
        });
        creditsButtonEl.addEventListener("click", () => {
            this.scene.start("Credits");
        })
        tutorialButtonEl.addEventListener("click", () => {
            this.scene.start("Tutorial");
        })
        this.backgroundLayers = [
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground1"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground2"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground3"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground4"),
        ]

        // Secret skip to boss button
        const secretSkipToBossButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK);
        secretSkipToBossButton.on('down', () => {
            this.scene.start("Story", {
                player: {
                    health: 1600,
                    maxHealth: 1600,
                    baseDamage: 25,
                    tileMod: 4.0,
                    gridSize: 10,
                    quickDraw: 4
                },
                level: 100
            });
        });

    }

    update() {
        this.speed = 1;
        for (let i = 0; i < this.backgroundLayers.length; i++) {
            this.backgroundLayers[i].tilePositionY += this.speed * (i + 1);
        }
    }
}