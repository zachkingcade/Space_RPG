class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {
        console.log("Boot Started");
        this.load.spritesheet("items", "./assets/images/userInterface/rpg_items.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("boomGraghic", "./assets/images/pixsim-explosion.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("smoke", "./assets/images/smoke.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image("gridBackground", "./assets/images/userInterface/Panel_Dialogue.png")
        this.load.image("upgradeOption", "./assets/images/userInterface/Menu_Middle.png")
        this.load.image("upgradeBackground", "./assets/images/userInterface/upgradeBackground.png")
        this.load.image("kingsTithe", "./assets/images/userInterface/kings-tithe-shark.png")
        this.load.image("back", "./assets/images/userInterface/back_button.png")
        this.load.image("platform", "./assets/images/backgrounds/01_wreck.png")
        this.load.html('story', './assets/menus/story.html');
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
            "11_boss",
            "12_endcard"
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
            9: 4,
            10: 1
        }
        //load backgrounds and monsters
        for (let s = 0; s < this.stages.length; s++) {
            this.load.image(`${this.stages[s]}`, `./assets/images/backgrounds/${this.stages[s]}.png`);
            for (let i = 1; i <= this.stageEnemyCount[s]; i++) {
                this.load.image(`${this.stages[s]}${i}`, `./assets/images/enemies/${this.stages[s]}/enemy (${i}).png`);
            }
        }
        this.load.image("titleScreenBackground1", `./assets/images/backgrounds/background_1.png`);
        this.load.image("titleScreenBackground2", `./assets/images/backgrounds/background_2.png`);
        this.load.image("titleScreenBackground3", `./assets/images/backgrounds/background_3.png`);
        this.load.image("titleScreenBackground4", `./assets/images/backgrounds/background_4.png`);
        //load sound effects
        this.load.audio("gunshot0", "./assets/audio/sounds/Ancient_Game_Flint_Lock_Rifle_Gun_Shot_1.wav");
        this.load.audio("gunshot1", "./assets/audio/sounds/Ancient_Game_Flint_Lock_Rifle_Gun_Shot_2.wav");
        this.load.audio("gunshot2", "./assets/audio/sounds/Ancient_Game_Flint_Lock_Rifle_Gun_Shot_3.wav");
        this.load.audio("gunshot3", "./assets/audio/sounds/Ancient_Game_Flint_Lock_Rifle_Gun_Shot_4.wav");
        this.load.audio("comboBoom", "./assets/audio/sounds/STORM MAGIC SPELL - Cinematic Electricity Thunder Hit - Weapon Throw Impact 01    [003789].mp3");
        //load music
        this.load.audio("titleMusic", "./assets/audio/music/Abstract Theme Loop 2.wav");
        this.load.audio("01_wreck", "./assets/audio/music/Dungeon_2.mp3");
        this.load.audio("02_junkyard", "./assets/audio/music/Dungeon_3.mp3");
        this.load.audio("03_forest", "./assets/audio/music/Suspicious Town.mp3");
        this.load.audio("04_distantCity", "./assets/audio/music/Battle_-_Warriors_Heart.m4a");
        this.load.audio("05_town", "./assets/audio/music/Journey into Fog (looped).wav");
        this.load.audio("06_door", "./assets/audio/music/Protection of Kingdom (looped).wav");
        this.load.audio("07_hallway", "./assets/audio/music/Friendly Ghosts.mp3");
        this.load.audio("08_medbay", "./assets/audio/music/Epic Battle 2 (Looped).wav");
        this.load.audio("09_breakout", "./assets/audio/music/A Long Way (Looped).wav");
        this.load.audio("10_FinalRoom", "./assets/audio/music/Action Dynamic Track 1 (looped).wav");
        this.load.audio("11_boss", "./assets/audio/music/Energy Rock Track 3 (looped).wav");
        this.load.audio("12_endcard", "./assets/audio/music/Soft Relaxing Track (looped).wav");
    }

    create() {
        //add animations
        this.anims.create({
            key: 'boomAnim',
            frames: this.anims.generateFrameNumbers('boomGraghic', {
                start: 0
            }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'smoke',
            frames: this.anims.generateFrameNumbers('smoke', {
                start: 0
            }),
            frameRate: 45,
            repeat: 0
        });
        this.anims.create({
            key: 'cycle-tiles',
            frames: this.anims.generateFrameNumbers('items', {
                start: 496,
                end: 499
            }),
            frameRate: 2,
            repeat: -1
        });
        this.scene.start("Title");
    }
}

var enemyData = {
    "01_wreck1": {
        name: "Wyrmfly",
        scale: .2
    },
    "01_wreck2": {
        name: "Magma Slime",
    },
    "01_wreck3": {
        name: "Lava Dropling",
    },
    "01_wreck4": {
        name: "Forge Rat",
    },
    "01_wreck5": {
        name: "Crimson Shroomite",
    },
    "02_junkyard1": {
        name: "Wasteland Wurm",
        scale: .30
    },
    "02_junkyard2": {
        name: "Photon Slime",
    },
    "02_junkyard3": {
        name: "Watchful Vond",
    },
    "02_junkyard4": {
        name: "Pit Crawler",
        scale: .3
    },
    "03_forest1": {
        name: "Black Onion",
        scale: .2
    },
    "03_forest2": {
        name: "?????",
    },
    "03_forest3": {
        name: "Cain Squirrel",
    },
    "03_forest4": {
        name: "Bulb Slinger",
    },
    "04_distantCity1": {
        name: "Fire Imp",
        scale: .2
    },
    "04_distantCity2": {
        name: "Bloodfeather",
        scale: .30
    },
    "04_distantCity3": {
        name: "Armored Thrasher",
    },
    "04_distantCity4": {
        name: "Fireland Wurm",
        scale: .30
    },
    "04_distantCity5": {
        name: "Wretched Black Onion",
        scale: .2
    },
    "04_distantCity6": {
        name: "Crystal Snapper",
        scale: .25
    },
    "05_town1": {
        name: "Miss Bunny",
        scale: .2
    },
    "05_town2": {
        name: "Drunken Brawler",
        scale: .28,
        y: 35,
        x: 60
    },
    "05_town3": {
        name: "Mysterious Jester",
    },
    "05_town4": {
        name: "Kalim Beat Cop",
    },
    "05_town5": {
        name: "Kalim P.D. Mage",
        y: 30
    },
    "05_town6": {
        name: "Corrupted Cleric",
        y: 35
    },
    "06_door1": {
        name: "Blood-bound Cultist",
        scale: .2,
        y: 30
    },
    "06_door2": {
        name: "Phaser Cultist",
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
        name: "Eldritch Golem",
        scale: .4,
        y: 40
    },
    "06_door5": {
        name: "Dawn Necromancer",
        y: 35
    },
    "07_hallway1": {
        name: "Starving",
        scale: .35,
        y: 35
    },
    "07_hallway2": {
        name: "Breaking",
        scale: .35,
        y: 35
    },
    "07_hallway3": {
        name: "Lying",
    },
    "07_hallway4": {
        name: "Whispering",
        scale: .2,
        y: 35
    },
    "07_hallway5": {
        name: "Crying",
        scale: .2,
        y: 35
    },
    "08_medbay1": {
        name: "Corrupt Wizard",
        scale: .35,
        y: 35
    },
    "08_medbay2": {
        name: "Vanguard Solider",
        scale: .2,
        y: 35
    },
    "08_medbay3": {
        name: "Vanguard Defender",
        scale: .2,
        y: 35
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
        y: 30
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
        name: "TOAA Guard",
        scale: .25,
        y: 20
    },
    "11_boss1":{
        name: "The One Above All",
        scale: .4
    },
}