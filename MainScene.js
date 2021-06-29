class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        //signal manager
        this.signals = SignalManager.get();
    }

    init(data) {
        this.player = data.player;
        this.level = data.level;
    }

    preload() {
        this.colorIds = {
            blue: 496,
            red: 497,
            green: 498,
            yellow: 499,
        }
        this.tileSize = {
            6: 70,
            7: 60,
            8: 50,
            9: 45,
            10: 40
        }
        this.tileScale = {
            6: 3.5,
            7: 3.5,
            8: 3,
            9: 2.75,
            10: 2.5
        }
        this.stages = {
            0: "01_wreck",
            1: "02_junkyard",
            2: "03_forest",
            3: "04_distantCity",
            4: "05_town",
            5: "06_door",
            6: "07_hallway",
            7: "08_medbay",
            8: "09_breakout",
            9: "10_FinalRoom",
        }
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
        this.gridRows = this.player.gridSize;
        this.gridColumns = Math.floor(this.gridRows / 2);
        //decide enemy data based on level
        this.enemyHealthMax = (this.level * (Math.floor(Math.random() * 50) + 25)) + 200;
        this.enemyHealth = this.enemyHealthMax;
        this.enemyAttackCooldownMax = Math.floor(Math.random() * 5) + 3;
        this.enemyAttackCooldown = this.enemyAttackCooldownMax;
        //determine enemy image
        let num = Math.floor(Math.random() * (this.stageEnemyCount[Math.floor(this.level / 10)])) + 1;
        this.enemyName = `${this.stages[Math.floor(this.level / 10)]}${num}`;
        console.log(num, this.enemyName);
        //other varibles
        this.gameover = false;
        this.enemyDead = false;
    }

    create() {
        console.log("Started Main Scene!");
        //add grid background
        let gridBG = this.add.image(225, 675, "gridBackground");
        gridBG.setScale(.40, .7);
        //add main background
        let background = this.add.image(-125, 0, this.stages[Math.floor(this.level / 10)]);
        background.setOrigin(0);
        background.setScale(.7, .7);
        background.setDepth(-1);
        //add enemy graghic
        this.enemyGraghic = this.add.image(220, 300, this.enemyName);
        this.enemyGraghic.setScale(.45);
        //check enemy data for special properties
        if (enemyData[this.enemyName].scale) {
            this.enemyGraghic.setScale(enemyData[this.enemyName].scale);
        }
        if(enemyData[this.enemyName].y){
            this.enemyGraghic.y += enemyData[this.enemyName].y;
        }
        if(enemyData[this.enemyName].x){
            this.enemyGraghic.x += enemyData[this.enemyName].x;
        }
        // Create the "hole" for the tiles to come out of
        this.createHole();
        //lets start with our grid
        this.grid = [];
        for (let r = 0; r < this.gridRows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.gridColumns; c++) {
                //pick color
                let colorNames = Object.keys(this.colorIds);
                let newColor = colorNames[Math.floor(Math.random() * colorNames.length)];
                this.grid[r][c] = {
                    color: newColor,
                    sprite: this.generateNewTileSprite(r, c, newColor)
                }
            }
        }
        this.createHealthUi();
        this.createEnemyCounter();
        this.createLevelText();

        // DEBUG Cheat key - REMOVE ME
        this.input.keyboard.on('keydown-N', () => {
            //heal player
            this.player.health = this.player.maxHealth;
            this.scene.start("Upgrade", {
                player: this.player,
                level: this.level
            })
        });
    }

    createHole() {
        const scale = this.tileScale[this.gridRows];
        let stand = this.add.sprite(405, 555, "items", 501);
        stand.setScale(scale);
        stand.setTint(0x000000);
        let hole = this.physics.add.sprite(405, 555, "items", 500)
        hole.setScale(scale);
        this.tweens.add({
            targets: [hole],
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            duration: 1000
        });
        hole.setAngularVelocity(25);
    }

    createLevelText() {
        this.levelText = this.add.text(20, 20, `Level: ${this.level}`, {
            fontSize: "32px"
        });
        this.levelText.setInteractive();
        this.levelText.on("pointerdown", () => {
            this.playerAttack(100);
        })
    }

    createHealthUi() {
        //create player health bar
        this.playerBar = this.add.graphics();
        this.playerBar.fillStyle(0x2ecc71, 1);
        this.playerBar.fillRect(10, 535, 350, 40);
        //create enemy health bar
        this.enemyBar = this.add.graphics();
        this.enemyBar.fillStyle(0xe74c3c, 1);
        this.enemyBar.fillRect(125, 125, 225, 40);
        //create player health text
        this.playerHpText = this.add.text(115, 545, `HP: ${this.player.health}/${this.player.maxHealth}`, {
            fontSize: "24px"
        });
        //create enemy health text
        this.enemyHpText = this.add.text(175, 135, `HP: ${this.enemyHealth}/${this.enemyHealthMax}`, {
            fontSize: "20px"
        });
        //create enemy name text
        this.enemyNameText = this.add.text(235, 70, `${enemyData[this.enemyName].name}`, {
            fontSize: "32px",
            fontStyle: "bold"
        });
        this.enemyNameText.setOrigin(.5);
    }

    createEnemyCounter() {
        this.enemyAttackCounterText = this.add.text(130, 105, `AT: ${this.enemyAttackCooldown}`, {
            fontSize: "20px"
        });
    }

    updateEnemyCounter() {
        this.enemyAttackCounterText.setText(`AT: ${this.enemyAttackCooldown}`);
    }

    updateEnemyHealthBar() {
        this.enemyBar.clear();
        this.enemyBar.fillStyle(0xe74c3c, 1);
        if (this.enemyHealth > -1) {
            this.enemyBar.fillRect(125, 125, ((this.enemyHealth / this.enemyHealthMax) * 225), 40);
        } else {
            this.enemyBar.fillRect(125, 125, 0, 40);
        }
        this.enemyHpText.setText(`HP: ${this.enemyHealth}/${this.enemyHealthMax}`);
    }

    updatePlayerHealthBar() {
        this.playerBar.clear();
        this.playerBar.fillStyle(0x2ecc71, 1);
        if (this.player.health > -1) {
            this.playerBar.fillRect(10, 535, ((this.player.health / this.player.maxHealth) * 350), 40);
        } else {
            this.playerBar.fillRect(10, 535, 0, 40);
        }
        this.playerHpText.setText(`HP: ${this.player.health}/${this.player.maxHealth}`);
    }

    generateNewTileSprite(row, column, color) {
        const x = 45 + (this.tileSize[this.gridRows] * row);
        const y = 610 + (this.tileSize[this.gridRows] * column);
        const scale = this.tileScale[this.gridRows];
        let tile = this.add.sprite(405, 555, "items", this.colorIds[color])
        tile.setScale(0);
        tile.row = row;
        tile.column = column;
        tile.setInteractive();
        tile.on("pointerdown", () => {
            if (!this.gameover) {
                this.combo = 0;
                this.deleteTiles(tile.row, tile.column, color);
                this.settleTiles();
                this.shiftColumnsInwards();
                this.redrawTiles();
                this.playerAttack(this.combo);
                this.updateEnemyHealthBar();
                if (!this.enemyDead) {
                    this.enemyAttack();
                    this.updatePlayerHealthBar();
                    this.updateEnemyCounter();
                }
            }
        })
        // Animate the tiles being moved to their starting location
        this.tweens.add({
            targets: [tile],
            scale: scale,
            duration: 150,
            onComplete: () => {
                this.tweens.add({
                    targets: [tile],
                    x: x,
                    y: y,
                    // Slightly differing speeds, idk looks neat I think
                    duration: 150
                });
            }
        });
        return tile;
    }

    deleteTiles(row, column, color) {
        if (row < this.gridRows && row > -1 && column > -1 && column < this.gridColumns && this.grid[row][column]) {
            if (this.grid[row][column].color == color) {
                this.combo++;
                this.grid[row][column].sprite.destroy();
                this.grid[row][column] = null;
                //search the 4 cardinal directions
                this.deleteTiles(row + 1, column, color);
                this.deleteTiles(row - 1, column, color);
                this.deleteTiles(row, column + 1, color);
                this.deleteTiles(row, column - 1, color);
            }
        }
    }

    settleTiles() {
        for (let r = 0; r < this.gridRows; r++) {
            while (this.hasHole(r)) {
                for (let c = 7; c > -1; c--) {
                    if (c + 1 < this.gridColumns && this.grid[r][c] != null && this.grid[r][c + 1] == null) {
                        //move tiles down in grid
                        this.grid[r][c + 1] = this.grid[r][c];
                        this.grid[r][c] = null;
                    }
                }
            }
        }
    }

    redrawTiles() {
        for (let r = 0; r < this.gridRows; r++) {
            for (let c = 0; c < this.gridColumns; c++) {
                if (this.grid[r] && this.grid[r][c]) {
                    const x = 45 + (this.tileSize[this.gridRows] * r);
                    const y = 610 + (this.tileSize[this.gridRows] * c);
                    let spr = this.grid[r][c].sprite;
                    this.tweens.add({
                        targets: [spr],
                        x: x,
                        y: y,
                        duration: 150
                    });
                    spr.row = r;
                    spr.column = c;
                    // this.grid[r][c].sprite.x = 45 + (this.tileSize[this.gridRows] * r);
                    // this.grid[r][c].sprite.y = 610 + (this.tileSize[this.gridRows] * c);
                    // this.grid[r][c].sprite.row = r;
                    // this.grid[r][c].sprite.column = c;
                }
            }
        }
    }

    hasHole(row) {
        let tileHit = false;
        let holeHit = false;
        for (let i = 0; i < this.gridColumns; i++) {
            if (this.grid[row] && this.grid[row][i]) {
                tileHit = true;
            } else if (tileHit == true) {
                holeHit = true;
            }
        }
        return holeHit;
    }

    isEmpty(row) {
        let tileHit = false;
        for (let i = 0; i < this.gridColumns; i++) {
            if (this.grid[row] && this.grid[row][i]) {
                tileHit = true;
            }
        }
        return !tileHit;
    }

    shiftColumnsInwards() {
        //prime loop
        let changeMade = true;
        while (changeMade) {
            changeMade = false;
            for (let r = 0; r < this.gridRows; r++) {
                if (this.isEmpty(r) && r + 1 < this.gridRows && !this.isEmpty(r + 1)) {
                    changeMade = true;
                    this.grid[r] = this.grid[r + 1];
                    this.grid[r + 1] = null;
                }
            }
        }
        //generate new tiles on empty columns
        for (let r = 0; r < this.gridRows; r++) {
            if (this.isEmpty(r)) {
                this.grid[r] = [];
                for (let c = 0; c < this.gridColumns; c++) {
                    let colorNames = Object.keys(this.colorIds);
                    let newColor = colorNames[Math.floor(Math.random() * colorNames.length)];
                    this.grid[r][c] = {
                        color: newColor,
                        sprite: this.generateNewTileSprite(r, c, newColor)
                    }
                }
            }
        }
    }

    calculateDamage(combo) {
        return Math.floor((this.player.baseDamage + this.player.tileMod * (combo - 1)) * combo);
    }

    enemyAttack() {
        this.enemyAttackCooldown--;
        if (this.enemyAttackCooldown < 1) {
            this.player.health -= (this.level * Math.floor(Math.random() * 3) + 2) + 35;
            this.enemyAttackCooldown = this.enemyAttackCooldownMax;
        }
        if (this.player.health < 1) {
            this.gameover = true;
            this.gameoverScreen = this.add.graphics();
            this.gameoverScreen.fillStyle(0xe74c3c, 1);
            this.gameoverScreen.fillRect(0, 0, 450, 800);
            this.gameoverScreen.alpha = 0;
            this.tweens.add({
                targets: this.gameoverScreen,
                duration: 500,
                alpha: 1,
                onComplete:
                    () => {
                        let gameoverText = this.add.text(225, 400, "Game Over!", {
                            fontSize: "48px",
                            color: "black"
                        });
                        gameoverText.alpha = 0;
                        gameoverText.setOrigin(.5, .5);
                        this.tweens.add({
                            targets: gameoverText,
                            duration: 500,
                            alpha: 1,
                            onComplete:
                                () => {
                                    console.log("here");
                                }
                        });
                    }
            });
        }
    }

    playerAttack(combo) {
        let damage = this.calculateDamage(combo);
        this.enemyHealth -= damage;
        if (this.enemyHealth < 1) {
            this.enemyDead = true;
            this.tweens.add({
                targets: this.enemyGraghic,
                duration: 500,
                alpha: 0,
                onComplete:
                    () => {
                        setTimeout(() => {
                            //heal player
                            this.player.health = this.player.maxHealth;
                            this.scene.start("Upgrade", {
                                player: this.player,
                                level: this.level
                            })
                        }, 500);
                    }
            });
        }
    }

    update() {

    }
}