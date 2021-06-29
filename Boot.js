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
        this.load.image("platform", "./assets/images/backgrounds/01_wreck.png" )
        //bring in enemies
        this.stages = [
            "01_wreck",
            "02_junkyard",
            "03_forest",
            "04_distantCity",
            "05_town",
            "06_door",
            "07_hallway",
            "08_medbay",
            "09_breakout",
            "10_FinalRoom",
        ]
        this.stageEnemyCount = {
            0: 5,
            1: 4,
            2: 4,
            3: 6,
            4: 6,
            5: 5,
            6: 5,
            7: 6,
            8: 7,
            9: 5,
        }
        for(let s = 0; s < this.stages.length; s++){
            for(let i = 1; i <= this.stageEnemyCount[s]; i++){
                console.log(`${this.stages[s]}${i}`);
                this.load.image(`${this.stages[s]}${i}`, `./assets/images/enemies/${this.stages[s]}/enemy (${i}).png` );
            }
        }
    }

    create() {
        this.scene.start("MainScene", {
            player: {
                health: 200,
                maxHealth: 200,
                baseDamage: 3,
                tileMod: 1.4,
                gridSize: 6
            },
            level: 1
        });
    }
}