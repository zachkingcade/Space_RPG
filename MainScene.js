class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        //signal manager
        this.signals = SignalManager.get();
    }

    preload() {
        this.load.spritesheet("items", "./assets/images/rpg_items.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("gridBackground", "./assets/images/Panel_Dialogue.png" )
        this.load.image("platform", "./assets/images/ship.png" )
        this.colorIds = {
            blue: 496,
            red: 497,
            green: 498,
            yellow: 499
        }
        this.gridRows = 10;
        this.gridColumns = 5;
        this.baseDamage = 2;
        this.modifier = 1.3;
        this.playerHealth = 200;
        this.enemyHealth = 200;
        this.enemyAttackCooldown = 3;
    }

    create() {
        console.log("Started Main Scene!");
        //add grid background
        let gridBG = this.add.image(225,700,"gridBackground");
        gridBG.setScale(.40,.5);
        let platform = this.add.image(0,0,"platform");
        platform.setOrigin(0);
        platform.setScale(.7,.7);
        platform.setDepth(-1);
        //lets start with a 30 x this.gridRows grid
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
    }

    generateNewTileSprite(row, column, color) {
        let tile = this.add.sprite(45 + (40 * row), 610 + (40 * column), "items", this.colorIds[color])
        tile.setScale(2.5);
        tile.row = row;
        tile.column = column;
        tile.setInteractive();
        tile.on("pointerdown", () => {
            this.combo = 0;
            this.deleteTiles(tile.row, tile.column, color);
            console.log(`Combo Hit: ${this.combo}, Damage Done: ${this.calculateDamage(this.combo)}`);
            this.settleTiles();
            this.shiftColumnsInwards();
            this.redrawTiles();
            this.enemyAttack();
            this.playerAttack(this.combo);
        })
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
                    this.grid[r][c].sprite.x = 45 + (40 * r);
                    this.grid[r][c].sprite.y = 610 + (40 * c);
                    this.grid[r][c].sprite.row = r;
                    this.grid[r][c].sprite.column = c;
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

    calculateDamage(combo){
        return Math.floor((this.baseDamage + this.modifier * (combo-1)) * combo);
    }

    enemyAttack(){
        this.enemyAttackCooldown--;
        if(this.enemyAttackCooldown < 1){
            console.log("Enemy Attacked!!!!");
            this.playerHealth - 50;
            this.enemyAttackCooldown = 3;
        }
        console.log(`enemyAttackCooldown: ${this.enemyAttackCooldown}`);
    }

    playerAttack(combo){
        let damage = this.calculateDamage(combo);
        this.enemyHealth -= damage;
        if(this.enemyHealth < 1){
            console.log("Enemy Killed!!!!");
        }
    }

    update() {

    }
}