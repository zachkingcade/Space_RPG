class Upgrade extends Phaser.Scene {

    constructor() {
        super("Upgrade");
    }

    init(data){
        this.player = data.player;
        this.level = data.level;
    }

    create() {
        console.log("Upgrade Scene Started!");
        this.addText();
        this.upgradePicked = false;
    }

    addText(){
        this.add.text(125, 100, `Player Stats: `,{
            fontSize: "24px"
        });
        this.add.text(125, 175, `Level: ${this.level}`,{
            fontSize: "24px"
        });
        let flashingText = this.add.text(40, 250, `Pick One Below to Upgrade:`,{
            fontSize: "24px",
        });
        this.tweens.add({
            targets: flashingText,
            duration: 1000,
            alpha: 0,
            repeat: -1,
            yoyo: true
        })

        //pickable stats
        this.healthText = this.add.text(125, 375, `Health: ${this.player.maxHealth} `,{
            fontSize: "24px"
        });
        this.healthText.setInteractive();
        this.healthText.on("pointerdown", () => {
            if(!this.upgradePicked){
                this.upgradePicked = true;
                //add health to the player
                this.player.maxHealth += 50;
                this.player.health = this.player.maxHealth;
                this.healthText.setText(`Health: ${this.player.maxHealth} `);
                //animate things
                this.tweens.add({
                    targets: this.healthText,
                    duration: 125,
                    alpha: 0,
                    yoyo: true,
                    repeat: 8,
                    onComplete: () => {
                        this.scene.start("MainScene",{
                            player: this.player,
                            level: (this.level + 1)
                        })
                    }
                })
            }
        })
        this.damageText = this.add.text(125, 450, `Base Damage: ${this.player.baseDamage} `,{
            fontSize: "24px"
        });
        this.damageText.setInteractive();
        this.damageText.on("pointerdown", () => {
            if(!this.upgradePicked){
                this.upgradePicked = true;
                //add health to the player
                this.player.baseDamage += 1;
                this.player.health = this.player.maxHealth;
                this.damageText.setText(`Base Damage: ${this.player.baseDamage} `);
                //animate things
                this.tweens.add({
                    targets: this.damageText,
                    duration: 125,
                    alpha: 0,
                    yoyo: true,
                    repeat: 8,
                    onComplete: () => {
                        this.scene.start("MainScene",{
                            player: this.player,
                            level: (this.level + 1)
                        })
                    }
                })
            }
        })
        this.tileModText = this.add.text(125, 525, `Tile Modifer: ` + this.player.tileMod.toFixed(1),{
            fontSize: "24px"
        });
        this.tileModText.setInteractive();
        this.tileModText.on("pointerdown", () => {
            if(!this.upgradePicked){
                this.upgradePicked = true;
                //add health to the player
                this.player.tileMod += 0.2;
                this.player.health = this.player.maxHealth;
                console.log(parseInt(this.player.tileMod));
                this.tileModText.setText(`Tile Modifer: ` + this.player.tileMod.toFixed(1));
                //animate things
                this.tweens.add({
                    targets: this.tileModText,
                    duration: 125,
                    alpha: 0,
                    yoyo: true,
                    repeat: 8,
                    onComplete: () => {
                        this.scene.start("MainScene",{
                            player: this.player,
                            level: (this.level + 1)
                        })
                    }
                })
            }
        })
    }
}