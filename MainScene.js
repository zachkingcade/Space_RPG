class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        //signal manager
        this.signals = SignalManager.get();
    }

    preload() {
    }

    create() {
        console.log("Started Main Scene!");
    }

    update() {
      
    }
}