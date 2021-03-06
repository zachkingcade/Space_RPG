class Story extends Phaser.Scene {

    constructor() {
        super("Story");
    }

    init(data) {
        this.saveData = data.saveData;
        this.playerSaveIndex = data.index;
        console.log(this.saveData, this.playerSaveIndex);
        this.player = this.saveData[this.playerSaveIndex].player;
        this.level = this.saveData[this.playerSaveIndex].level;
    }

    preload() {
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
            10: "11_boss",
            11: "12_endcard"
        }
        //volume by song because apparently everything has to be custom, ughhh
        this.stageVolumes = {
            "01_wreck": .65,
            "02_junkyard": .5,
            "03_forest": .75,
            "04_distantCity": .25,
            "05_town": .5,
            "06_door": .3,
            "07_hallway": .5,
            "08_medbay": .5,
            "09_breakout": .25,
            "10_FinalRoom": .25,
            "11_boss": .5,
            "12_endcard": .5
        }
        this.storyBits = [
            `Well, that dunnit. Ten years o service and we get blasted outta space by some mangy ol bandits.
            Spun out like a dagum top. Lucky its just the ship in pieces, huh? Planet seems familiar though,
            dunnit? We were warping on a path that ran by past Terra-Vond when we were blasted, and the
            terrain sure seems to match... Better hope not, we aren't equipped for TL-9 planets and
            reinforcements ain't coming with that radio in flame. Better see what we can salvage from the
            ship, and if this is Vond, be ready to fight off fire feeders like forge rats and magma
            slimes.`.replace(/\s            /g, ' '),

            `Well son of a space orc! Guess we know its Vond now! How many of those lil lava drinkin, ugly
            mugged monstrosities was that? Fires are dyin down now. Shouldnt have to worry bout any more fire
            feeders. Course, now we gotta strap up and find who did this. Just pick a direction n get movin I
            suppose. Dont think too much bout the local wildlife sneakin up on ya, just keep your trigger
            finger ready, alright?`.replace(/\s            /g, ' '),

            `Lookee lookee... See the tread marks in the grass right over ere? We seem to have stumbled pon
            a path. Les follow it up to the road and track us some bandits. Bes avoid the Vond citizens
            if we can. Its a dangerous man that makes home on a TL-9...`.replace(/\s            /g, ' '),

            `Hooooweeeeeeee! It sure is warmin up, aint it? Jus like home, right? Well, maybe not quite as
            toasty as Texas, but sure is close! Gotta tell ya, hopin to see a city sometime soon. Maybe...
            Is that one on the horizon? We needin some water.
            Gotta get there before we...`.replace(/\s            /g, ' '),

            `Maybe we shoulda been careful with our wishes... Cus this right here is Kalim. Oh sure we gonna
            find some water here... If we don find a knife in our gut first. Just keep yer head low and make
            sure not to eye any of them outlaws too long.
            Round here the jesters might even try ya.`.replace(/\s            /g, ' '),

            `Finally, a good drink! Hydrated, drunk on whiskey, and bathed in outlaw blood... What a day.
            Now look ere at this cowerin jester... What a mess. Guess we outta interrogate em.\n\n
            "Now, buddy, you gonna tell me what I wanna know, take this change, and treat a pretty lass oer
            yonder at the pub? Or are you gonna make me do ya like yer friends oer there?"...\n\n...\n\n...an
            jus like that we got ourselves a name. Feller said we lookin fer some creepy cultists goin by The
            Galactic Dawn. And it must be Christmas cuz we found ourselves a good ol fashioned hidden door.
            \n\nFigure we should knock?`.replace(/\s            /g, ' '),

            `Creepy hallway. Go figure. Every cult has ta have a creepy hallway. Jus the same, we better
            track down the boss an question em. Gotta know why they shot us outta warp. And gotta stop em
            from blastin more folk. Las thing the alliance is gonna want is travelers gettin spaced. Bes
            get a move on... Now what in the Milky Way is tha-`.replace(/\s            /g, ' '),

            `Those... Things were nightmarish. These cultists are experimentin on people an critters alike.
            Was bes to put em down. Even better to find the lab and destroy it. Figure the experiments are
            being conducted in the med bay. The digi-map down the hall said medical should be right round
            the bend. Haven't seen no cultists yet, so the whole kit n caboodle are probably guarding
            the lab. Bes prepare to knock some heads...`.replace(/\s            /g, ' '),

            `Werent clean but we got the job done. Now jus gotta set a charge, wipe this lil slice o hell
            of the starmaps, kill us a cult leader, and wash all this gore off in the river. Firs, we should
            take a breather. Just gonna sit down ere an - Dagum it! The experiments are gettin outta their
            containment units. Guess we gotta put em down the hard way.`.replace(/\s            /g, ' '),

            `Okay... Now we gonna take a secun and brea-\n\n
            ...\n\n
            They gotta be kiddin, right? Knock us out an tie us up in a creepy chamber? Whats next? A
            sacrifice? Oh now who is this fella?\n\n
            "Alright, get the prisoner prepped for sacrificing"\n\n
            Well, spose ya cant beat the classics, so we cant exactly blame em. Time to deploy the laser
            cutters to free us. Then we space the rest of the cultists and set off charges to kill whatever
            that creepy freak hidin in the darkness is.`.replace(/\s            /g, ' '),

            `Looks Like that freak is coming out of the dark. Guess its not too happy we spaced all its
            friends. Prolly against protocol but les ice this last one ourselves while the charges count
            down.`.replace(/\s            /g, ' '),

            `We need to get out of here! Just keep running this wa--
            Get up! Get back up! There was an explosion, keep moving.
            
            ...
            
            A little scuffed up and bloody but we're alright. Survived a TL-9 planet and managed
            to take down the Galactic Dawn, not a bad days work I figure.
            
            ...

            Came across a coupla officers that had been staking out the Galactic Dawn. They were impressed we
            took em out with such limited gear. We gettin promoted and a mighty fine pay raise. Guess we're
            just that good. Gonna hitch a ride back with them fellas, rest back home and maybe have a
            barbeque. Yeeeeeeehaw!

            Til next time, pardner.
            `.replace(/\s            /g, ' '),
        ]
    }

    create() {
        console.log("Story Started");
        //play new music
        this.sound.stopAll();
        this.sound.play(this.stages[Math.floor(this.level / 10)], {
            volume: this.stageVolumes[this.stages[Math.floor(this.level / 10)]],
            loop: true
        });
        //add main background
        let background = this.add.image(-125, 0, this.stages[Math.floor(this.level / 10)]);
        background.setOrigin(0);
        background.setScale(.7, .7);
        //add grid background
        let gridBG = this.add.image(225, 675, "gridBackground");
        gridBG.setScale(.40, .7);
        //add text
        let story = this.add.dom(220, 690).createFromCache('story');
        let textEl = story.parent.querySelector('#story-text');
        textEl.innerText = `${this.storyBits[Math.floor(this.level / 10)]}`;
        /** @type {HTMLButtonElement} */
        let btnEl = story.parent.querySelector('#continue-btn');
        btnEl.addEventListener('click', () => {
            this.saveData[this.playerSaveIndex].player = this.player;
            this.saveData[this.playerSaveIndex].level = this.level;
            if (this.level < 100) {
                this.scene.start("MainScene", {
                    saveData: this.saveData,
                    index: this.playerSaveIndex
                });
            } else if (this.level == 100) {
                this.scene.start("Boss", {
                    saveData: this.saveData,
                    index: this.playerSaveIndex
                });
            } else {
                this.scene.start("Title");
            }

        });
        let conText = this.add.text(100, 525, `Chapter ${Math.floor(this.level / 10) + 1}`, {
            fontSize: "42px"
        });
    }
}