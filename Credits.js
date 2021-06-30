class Credits extends Phaser.Scene {
    /**
     * String containing all the credits for the game. Tabs will be removed
     * when displayed. Lines should not exceed 55 characters for display.
     */
    creditString =         `The following people contributed to 
                            Space RPG
                            ***********************************
                            
                            Developers
                            Zachary Kingcade
                            
                            A Special Thanks to the following 
                            paid assets artists
                            
                            Sounds Effects:
                            EPIC STOCK MEDIA
                            (gamedevmarket.net/member/epic-stock-media)
                            FUSE HIVE
                            (gamedevmarket.net/member/fusehive-com)

                            Music:
                            Andrey Sitkov
                            Joel Steudler
                            JDB Artist

                            Backgrounds:
                            Galefire RPG
                            Enjl (enjl.itch.io)

                            Enemies:
                            Joseph Seraph

                            User-Interface:
                            ARTBYKANDLES
                            (gamedevmarket.net/member/artbykandles)
                            douteigami (douteigami.itch.io)
                            Limofeus (limofeus.itch.io)
                            NYKNCK (kvsr.itch.io)

                            And YOU for checking out our game!
                            
                            
                            `.replace(/                            /g, '');
    /** Size of the font in pixels */
    fontSize = 16;
    /** Spacing between lines in pixels */
    spacing;
    /** Height of creditString in pixels */
    creditStringHeight;
    /** Stores the graphic version of creditString */
    splashText;
    /** Twwen that slowly scrolls splashText across the screen from bottom to top */
    scrollTween;
    /** Button used to return to the home screen */
    creditsButton;

    /** Creates instance of Scene */
    constructor() {
        super("Credits");
        // Set the spacing as a function of font size
        this.spacing = this.fontSize / 4;
        // Calculate the full height of the credits string (all lines and spacing)
        this.creditStringHeight = this.creditString.split('\n').length
            * (this.fontSize + this.spacing)
            + (this.spacing * 2);
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Create the KT logo
        this.add.image(390, 120, 'kingsTithe').setAlpha(0.5);
        // Create the text object for the credits
        this.splashText = this.add.text(225, 800, this.creditString, {
            fontSize: this.fontSize,
            color: 'white',
            align: "center"
        });
        //set correcct line spacing based on values from init
        this.splashText.setLineSpacing(this.spacing);
        //set origin to the center(x) and top (y) of the text element to
        //make our scrolling tween go much smoother
        this.splashText.setOrigin(.5, 0);
        //set scrolling tween - tween that slowly scrolls from the top to
        //the bottom of the screen in an infinite loop
        this.scrollTween = this.tweens.add({
            targets: this.splashText,
            y: 0 - this.creditStringHeight,
            duration: 30 * this.creditStringHeight,
            paused: false,
            yoyo: false,
            repeatDelay: 2000,
            repeat: -1,
        });
        //add back button
        this.creditsButton = this.add.sprite(0, -25, "back").setOrigin(0, 0);
        this.creditsButton.setScale(3.25);
        //set it so when the button sprite is clicked on it takes the player
        //back to the HomeScreen
        this.creditsButton.setInteractive();
        this.creditsButton.on("pointerdown", function () {
            this.scene.start("Title");
        }, this);
    }

}