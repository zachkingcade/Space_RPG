class Upgrade extends Phaser.Scene {

    constructor() {
        super("Upgrade");
    }

    init(data) {
        this.player = data.player;
        this.level = data.level;
    }

    create() {
        console.log("Upgrade Scene Started!");

        this.cameras.main.setBackgroundColor('#1A1A1A');

        //add background
        let bg = this.add.image(225, 220, "upgradeBackground");
        bg.setOrigin(.5);
        bg.setScale(.3);

        // DEBUG Cheat key - REMOVE ME
        this.input.keyboard.on('keydown-N', () => {
            this.player.maxHealth += 150;
            this.player.baseDamage += 3;
            this.player.tileMod += 0.6;
            this.player.gridSize = 10;
            this.player.health = this.player.maxHealth;
            this.leaveScene();
        });
        this.upgrades = [
            "Health",
            "Base Damage",
            "Combo Bonus",
            "Quick Draw"
        ]
        if (this.player.gridSize < 10) {
            this.upgrades.push("Grid Size");
        }
        this.upgradeDescrips = {
            "Health": "The Amount of health the player has.",
            "Base Damage": "The Base damage of a single Attack Tile",
            "Combo Bonus": "The bonus for each additional Attack Tile in a combo",
            "Grid Size": "The size of the grid Attack Tile",
            "Quick Draw": "Deal more damage when making rapid attacks"
        }
        this.changeText = {
            "Health": `${this.player.maxHealth} => ${this.player.maxHealth + 50}`,
            "Base Damage": `${this.player.baseDamage} => ${this.player.baseDamage + 1}`,
            "Combo Bonus": `${(this.player.tileMod).toFixed(1)} => ${(this.player.tileMod + 0.2).toFixed(1)}`,
            "Grid Size": `${this.player.gridSize} => ${this.player.gridSize + 1}`,
            "Quick Draw": `${this.player.quickDraw} => ${this.player.quickDraw + 1}`
        }
        this.pickUpgrades();
        this.createStatIcons();
        this.addPanels();
        this.upgradePicked = false;
    }

    leaveScene() {
        this.level += 1;
        if (Number.isInteger(this.level / 10)) {
            this.scene.start("Story", {
                player: this.player,
                level: this.level
            })
        } else {
            this.scene.start("MainScene", {
                player: this.player,
                level: this.level
            })
        }
    }

    pickUpgrades() {
        const index = Math.floor(Math.random() * this.upgrades.length);
        this.upgrade1 = this.upgrades[index];
        this.upgrades.splice(index, 1);
        console.log(`upgrades ${Math.floor(Math.random() * this.upgrades.length)}`)
        this.upgrade2 = this.upgrades[Math.floor(Math.random() * this.upgrades.length)];
    }

    addPanels() {
        //add backdrops
        let panel01 = this.add.image(225, 525, "upgradeOption");
        panel01.setScale(.3);
        let panel02 = this.add.image(225, 700, "upgradeOption");
        panel02.setScale(.3);
        let panel01Text = this.add.text(225, 475, this.upgrade1, {
            fontSize: "32px",
            color: "black"
        });

        panel01Text.setOrigin(.5);
        let panel01Descrip = this.add.text(75, 490, this.upgradeDescrips[this.upgrade1], {
            fontSize: "24px",
            color: "black"
        });
        panel01Descrip.setWordWrapWidth(325);
        let panel01ChangeText = this.add.text(225, 578, this.changeText[this.upgrade1], {
            fontSize: "24px",
            color: "green"
        });
        panel01ChangeText.setOrigin(.5);

        let panel02Text = this.add.text(225, 650, this.upgrade2, {
            fontSize: "32px",
            color: "black"
        });
        panel02Text.setOrigin(.5);
        let panel02Descrip = this.add.text(75, 665, this.upgradeDescrips[this.upgrade2], {
            fontSize: "24px",
            color: "black"
        });
        panel02Descrip.setWordWrapWidth(325);
        let panel02ChangeText = this.add.text(225, 755, this.changeText[this.upgrade2], {
            fontSize: "24px",
            color: "green"
        });
        panel02ChangeText.setOrigin(.5);

        //events
        panel01.setInteractive();
        panel01.on("pointerdown", () => {
            panel02.removeInteractive();
            this.tweens.add({
                targets: [panel02, panel02Descrip, panel02Text, panel02ChangeText],
                alpha: 0,
                duration: 500,
                repeat: false,
                onComplete: () => {
                    this.handleUpgrades(this.upgrade1);
                    this.leaveScene();
                }
            })
        })

        panel02.setInteractive();
        panel02.on("pointerdown", () => {
            panel01.removeInteractive();
            this.tweens.add({
                targets: [panel01, panel01Descrip, panel01Text, panel01ChangeText],
                alpha: 0,
                duration: 500,
                repeat: false,
                onComplete: () => {
                    this.handleUpgrades(this.upgrade2);
                    this.leaveScene();
                }
            })
        })
    }

    handleUpgrades(upgradeString) {
        if (upgradeString == "Health") {
            console.log("here");
            this.player.maxHealth += 50;
            this.player.health = this.player.maxHealth;
        } else if (upgradeString == "Base Damage") {
            this.player.baseDamage += 1;
        } else if (upgradeString == "Combo Bonus") {
            this.player.tileMod += 0.2;
        } else if (upgradeString == "Grid Size") {
            this.player.gridSize += 1;
        } else if (upgradeString == "Quick Draw"){
            this.player.quickDraw += 1;
        }
    }

    createStatIcons() {
        this.add.text(225, 35, `Level Up!`, {
            fontSize: "40px"
        }).setOrigin(0.5);
        this.add.text(225, 85, `${this.level} => ${this.level + 1}`, {
            fontSize: "40px"
        }).setOrigin(0.5);
        let flashingText = this.add.text(225, 400, `Choose an Upgrade`, {
            fontSize: '32px'
        }).setOrigin(0.5);
        this.tweens.add({
            targets: flashingText,
            duration: 1000,
            alpha: 0,
            repeat: -1,
            yoyo: true
        })

        // Y value for icon display
        const p = 20; // Padding from edges
        const w = 82; // Width of screen icons take
        const x = p + .5 * w; // Start x coord
        const y = 220; // Y coord of icons
        const sc = 5;
        const textStyle = {
            fontSize: "28px",
            stroke: 'black',
            strokeThickness: 6
        };

        // Rectangle to display icons over
        // this.add.rectangle(225, 220, 420, 150, 0x222222);

        // Stat Icons
        const healthIcon = this.add.sprite(x + 0 * w, y, 'items', 442)
            .setScale(sc);
        const damageIcon = this.add.sprite(x + 1 * w, y, 'items', 484)
            .setScale(sc);
        const tileIcon = this.add.sprite(x + 2 * w, y, 'items')
            .setScale(sc).play('cycle-tiles');
        const gridIcon = this.createHole(x + 3 * w, y, sc);
        const quickIcon = this.add.sprite(x + 4 * w, y, 'items', 64)
            .setScale(sc);

        // Stat text
        this.healthText = this.add.text(x + 0 * w, y, `${this.player.maxHealth}`, textStyle)
            .setOrigin(0.5);
        this.damageText = this.add.text(x + 1 * w, y, `${this.player.baseDamage}`, textStyle)
            .setOrigin(0.5);
        this.tileModText = this.add.text(x + 2 * w, y, `${this.player.tileMod.toFixed(1)}`, textStyle)
            .setOrigin(0.5);
        this.gridSizeText = this.add.text(x + 3 * w, y, `${this.player.gridSize}`, textStyle)
            .setOrigin(0.5);
        if (this.player.gridSize >= 10) {
            this.gridSizeText.setColor('gold');
        }
        this.tileModText = this.add.text(x + 4 * w, y, `${this.player.quickDraw}`, textStyle)
            .setOrigin(0.5);
    }

    createHole(x, y, sc) {
        let stand = this.add.sprite(x, y, "items", 501);
        stand.setScale(sc);
        stand.setTint(0x000000);
        let hole = this.physics.add.sprite(x, y, "items", 500)
        hole.setScale(sc);
        this.tweens.add({
            targets: [hole],
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            duration: 1000
        });
        hole.setAngularVelocity(25);
        return {
            stand: stand,
            hole: hole
        }
    }

}