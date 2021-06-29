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
            this.load.image(`${this.stages[s]}`, `./assets/images/backgrounds/${this.stages[s]}.png` );
            for(let i = 1; i <= this.stageEnemyCount[s]; i++){
                this.load.image(`${this.stages[s]}${i}`, `./assets/images/enemies/${this.stages[s]}/enemy (${i}).png` );
            }
        }
    }

    create() {
        this.scene.start("Story", {
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

var enemyData = {
    "01_wreck1": {
        name: "Flaming Armor Bug", 
        scale: .2
    },
    "01_wreck2": {
        name: "Magma Slime", 
    },
    "01_wreck3": {
        name: "Flaming Baby Slime", 
    },
    "01_wreck4": {
        name: "Forge Rat", 
    },
    "01_wreck5": {
        name: "Sentient Flameroom", 
    },
    "02_junkyard1": {
        name: "Wasteland Lizard",
        scale: .30 
    },
    "02_junkyard2": {
        name: "Adult Slime", 
    },
    "02_junkyard3": {
        name: "Crystal Eye Plant", 
    },
    "02_junkyard4": {
        name: "Hard Headed Beetle",
        scale: .3 
    },
    "03_forest1": {
        name: "Black Onion Mimic",
        scale: .2 
    },
    "03_forest2": {
        name: "?????", 
    },
    "03_forest3": {
        name: "Black Murder Squirrel", 
    },
    "03_forest4": {
        name: "Poison Bulb Slinger", 
    },
    "04_distantCity1": {
        name: "Fire Imp",
        scale: .2 
    },
    "04_distantCity2": {
        name: "Holy Blood Bird",
        scale: .30 
    },
    "04_distantCity3": {
        name: "Armored Thrasher", 
    },
    "04_distantCity4": {
        name: "Fireland Lizard",
        scale: .30 
    },
    "04_distantCity5": {
        name: "Dark-blue Onion Mimic",
        scale: .2 
    },
    "04_distantCity6": {
        name: "Mystic Turtle",
        scale: .25 
    },
    "05_town1": {
        name: "Miss Bunny",
        scale: .2 
    },
    "05_town2": {
        name: "Drunk Lizard Warrior",
        scale: .28,
        y: 35,
        x: 60
    },
    "05_town3": {
        name: "Mysterious Jester", 
    },
    "05_town4": {
        name: "Street Guard", 
    },
    "05_town5": {
        name: "Water Mage",
        y: 30 
    },
    "05_town6": {
        name: "Holy Mage",
        y: 35 
    },
    "06_door1": {
        name: "Blood Magic Guard",
        scale: .2,
        y: 30 
    },
    "06_door2": {
        name: "Lazer Sword Guard",
        scale: .28,
        y: 35,
        x: 60 
    },
    "06_door3": {
        name: "Flower Golem",
        scale: .4,
        y: 40 
    },
    "06_door4": {
        name: "Mystic Golem",
        scale: .4,
        y: 40 
    },
    "06_door5": {
        name: "Undead Skull Mage",
        y: 35 
    },
    "07_hallway1": {
        name: "Blood Zombie",
        scale: .35,
        y:35 
    },
    "07_hallway2": {
        name: "Spine-Broken Zombie",
        scale: .35,
        y:35 
    },
    "07_hallway3": {
        name: "Two-headed Amalgamation", 
    },
    "07_hallway4": {
        name: "Broken Red Angel",
        scale: .2,
        y:35 
    },
    "07_hallway5": {
        name: "Broken Soul Angel",
        scale: .2,
        y:35 
    },
    "08_medbay1": {
        name: "Corrupt Wizard",
        scale: .35,
        y:35  
    },
    "08_medbay2": {
        name: "Vanguard Solider",
        scale: .2,
        y:35  
    },
    "08_medbay3": {
        name: "Vanguard Defender",
        scale: .2,
        y:35  
    },
    "08_medbay4": {
        name: "Vanguard Heavy",
        scale: .225,
        y: 45  
    },
    "08_medbay5": {
        name: "Shaman",
        scale: .2,  
    },
    "08_medbay6": {
        name: "Corrupt Witch", 
    },
    "09_breakout1": {
        name: "Female Abomination",
        scale: .18,
        y: 25 
    },
    "09_breakout2": {
        name: "long-neck Abomination",
        scale: .2,
        y: 30 
    },
    "09_breakout3": {
        name: "Mystic Two-headed Amalgamation", 
    },
    "09_breakout4": {
        name: "Soul-Trapped Abomination",
        y: 30 
    },
    "09_breakout5": {
        name: "Formless Abomination",
        y: 30 
    },
    "09_breakout6": {
        name: "Soul-Broken Mystic Angel",
        scale: .2,
        y:30 
    },
    "09_breakout7": {
        name: "Cursed Abomination",
        scale: .18
    },
    "10_FinalRoom1": {
        name: "Forge Burned Brother",
        scale: .2 
    },
    "10_FinalRoom2": {
        name: "Cursed Sister",
        scale: .2,
        y: 30 
    },
    "10_FinalRoom3": {
        name: "Demi-Child",
        scale: .2,
        y: 30 
    },
    "10_FinalRoom4": {
        name: "The One Above All",
        scale: .4 
    },
    "10_FinalRoom5": {
        name: "TOAA Guard",
        scale: .25,
        y: 20 
    },
}