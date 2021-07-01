class Tutorial extends Phaser.Scene {

    constructor() {
        super("Tutorial")
    }

    preload(){
        this.load.html("tutorial", "./assets/menus/tutorial.html");
    }

    create() {
        this.cameras.main.setBackgroundColor("#103130");
        let menu = this.add.dom(225,400).createFromCache("tutorial");
        let backButton = menu.parent.querySelector("#continue-btn");
        backButton.addEventListener("click", () => {
            this.scene.start("Title");
        })
    }
}