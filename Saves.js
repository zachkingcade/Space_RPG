class Saves extends Phaser.Scene {

    constructor() {
        super("Saves");
        this.loadSaveData();
        this.confirmingDelete = false;
    }

    create() {
        //add text
        this.add.text(10,10, "Select an existing save file or enter a name and select an empty save slot:",{
            fontSize: "24px"
        })
        .setWordWrapWidth(430);
        this.add.text(50,100,"Name:",{
            fontSize: "24px"
        });
        // Create an input element for username
        this.nameInput = this.add.dom(225, 150, 'input');
        this.nameInput.setScale(2);
        this.nameElement = this.nameInput.node;

        //create save panels
        let savePanels = [];
        for (let i = 0; i < 3; i++) {
            let savePanel = this.add.image(225, 350 + (i * 170), "gridBackground");
            savePanel.setScale(.15, .3);
            savePanel.setOrigin(.5);
            //add text, if save data add symbols and name, if empty single text line saying empty
            if (this.saveData[i].status == "saved") {
                let player = this.saveData[i].player;
                if(!player.name){
                    player.name = "nameless";
                }
                savePanel.nameText = this.add.text(225, 295 + (i * 170), (player.name).substring(0, 12));
                savePanel.nameText.setOrigin(.5);
                savePanel.levelText = this.add.text(35, 318 + (i * 170), `Level: ${this.saveData[i].level}`, {
                    fontSize: "20px"
                });
                // Y value for icon display
                const p = 20; // Padding from edges
                const w = 82; // Width of screen icons take
                const x = p + .5 * w; // Start x coord
                const y = 370 + (i * 170); // Y coord of icons
                const sc = 3.25;
                const textStyle = {
                    fontSize: "20px",
                    stroke: 'black',
                    strokeThickness: 6
                };

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
                this.healthText = this.add.text(x + 0 * w, y, `${player.maxHealth}`, textStyle)
                    .setOrigin(0.5);
                this.damageText = this.add.text(x + 1 * w, y, `${player.baseDamage}`, textStyle)
                    .setOrigin(0.5);
                this.tileModText = this.add.text(x + 2 * w, y, `${player.tileMod.toFixed(1)}`, textStyle)
                    .setOrigin(0.5);
                this.gridSizeText = this.add.text(x + 3 * w, y, `${player.gridSize}`, textStyle)
                    .setOrigin(0.5);
                if (player.gridSize >= 10) {
                    this.gridSizeText.setColor('gold');
                }
                this.tileModText = this.add.text(x + 4 * w, y, `${player.quickDraw}`, textStyle)
                    .setOrigin(0.5);
                //add event
                savePanel.setInteractive();
                savePanel.on("pointerdown", () => {
                    if(!this.confirmingDelete){
                        if(Number.isInteger(this.saveData[i].level / 10)){
                            this.scene.start("Story", {
                                saveData: this.saveData,
                                index: i
                            });
                        } else {
                            this.scene.start("MainScene", {
                                saveData: this.saveData,
                                index: i
                            });
                        }
                    }
                })
                //add delete text and event
                savePanel.deleteText = this.add.text(420, 275 + (i * 170), "X",{
                    fontSize: "42px",
                    color: "red"
                })
                .setInteractive()
                .on("pointerdown", () => {
                    this.confirmDeleteWindow(this.saveData[i].player.name, i);
                })
            } else if (this.saveData[i].status == "empty") {
                savePanel.statusText = this.add.text(225, 360 + (i * 170), "No Save Data", {
                    fontSize: "32px"
                })
                savePanel.statusText.setOrigin(.5);
                savePanel.setInteractive();
                savePanel.on("pointerdown", () => {
                    if(this.name = null || this.name == ""){
                        this.name = "nameless";
                    }
                    this.saveData[i] = {
                        status: "saved",
                        player: {
                            name: this.nameElement.value,
                            health: 200,
                            maxHealth: 200,
                            baseDamage: 3,
                            tileMod: 1.4,
                            gridSize: 6,
                            quickDraw: 1
                        },
                        level: 1
                    };
                    this.scene.start("Story", {
                        saveData: this.saveData,
                        index: i
                    })
                })
            } else {
                savePanel.statusText = this.add.text(225, 360 + (i * 170), "Error Loading Data", {
                    fontSize: "32px"
                })
                savePanel.statusText.setOrigin(.5);
            }
            //add panel to the savePanels array
            savePanels.push(savePanel);
        }
    }

    confirmDeleteWindow(name, saveNum){
        this.confirmingDelete = true;
        let cover = this.add.rectangle(225,400,450,800,"#3f434d",.75);
        let window = this.add.dom(225, 400).createFromCache('confirmation');
        let warningText = window.parent.querySelector("#warning-text");
        warningText.innerText = `Are you sure you want to delete ${name}'s save data?`;
        let confirmButton = window.parent.querySelector("#confirm");
        let cancelButton = window.parent.querySelector("#cancel");
        confirmButton.addEventListener("click", () => {
            this.saveData[saveNum] = {status: "empty"};
            this.storeSaveData();
            this.scene.start("Saves");
        })
        cancelButton.addEventListener("click", () => {
            console.log();
            cover.destroy();
            window.destroy();
            this.confirmingDelete = false;
        })
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

    storeSaveData() {
        localStorage.setItem("ZekeTheDeveloper.SpaceRPG", JSON.stringify(this.saveData));
    }

    loadSaveData() {
        const data = JSON.parse(localStorage.getItem("ZekeTheDeveloper.SpaceRPG"));
        // Check if data was loaded correctly
        if (data) {
            this.saveData = data;
            console.log(this.saveData);
        } else {
            this.saveData = [
                {status: "empty"},
                {status: "empty"},
                {status: "empty"}
            ];
            this.storeSaveData();
        }
    }
}