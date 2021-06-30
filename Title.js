class Title extends Phaser.Scene {

    constructor() {
        super("Title")
    }

    preload(){
        this.load.html("button", "./assets/menus/button.html");
    }

    create() {
        let menu = this.add.dom(300,400).createFromCache("button");
        let playButtonEl = menu.parent.querySelector("#play");
        let tutorialButtonEl = menu.parent.querySelector("#tutorial");
        let creditsButtonEl = menu.parent.querySelector("#credits");

        playButtonEl.addEventListener('click', ()=>{
            this.scene.start("Story", {
                player: {
                    health: 200,
                    maxHealth: 200,
                    baseDamage: 3,
                    tileMod: 1.4,
                    gridSize: 6,
                    quickDraw: 1
                },
                level: 1
            });            
        });
        creditsButtonEl.addEventListener("click", () => {
            this.scene.start("Credits");
        })

        this.backgroundLayers = [
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground1"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground2"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground3"),
            this.add.tileSprite(225, 400, 450, 800, "titleScreenBackground4"),
        ]
    }

    update() {
        this.speed = 1;
        for(let i = 0; i < this.backgroundLayers.length; i++){
            this.backgroundLayers[i].tilePositionY += this.speed * (i+1);
        }
    }
}