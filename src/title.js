const CONSTANTS = {
    GRAVITY: 8,
    TERMINAL_VEL: 10,
    JUMP_SPEED: 12
};

const titleSprite = new Image();
titleSprite.src = "/home/andrew/Desktop/dino_jump/img/titleScreen.png";

export default class Title {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.space_pressed = false;
        this.start_titleAnimation = false;
        this.titleAnimation_finished = false;
        this.vel = 0;
        this.registerEvents();

        this.title = [
            this.newTitle()
        ];
    }

    newTitle() {
        const title = {
            x: 44,
            y: 200,
            width: 448,
            height: 65
        };
        return title;
    }

    drawTitleScreen(ctx, title) {
        ctx.drawImage(
            titleSprite,
            0, 0,  //sX, sY      lessen height to move line up
            498, 65,  //           lessen this height after to shorten bottem
            title.x, title.y,
            title.width, title.height
        )
    }

    moveTitleScreen() {
        if (this.title[0].y < 640 && this.start_titleAnimation === true) {
            this.title[0].y += this.vel;
            this.title[0].y += CONSTANTS.GRAVITY;

            if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
                //if the terminal velocity is exceeded, we set it to the terminal velicty
                if (this.vel > 0) {
                    this.vel = CONSTANTS.TERMINAL_VEL;
                } else {
                    this.vel = CONSTANTS.TERMINAL_VEL * -1;
                }
            }
        }

        if (this.title[0].y >= 640) {
            this.title.shift();
            this.titleAnimation_finished = true;
            // debugger
        }
    }

    jump() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel -= 10;
        this.space_pressed = false;
    }

    registerEvents() {
        this.boundClickHandler = this.input.bind(this);
        document.addEventListener("keydown", this.boundClickHandler);
    }

    input(event) {
        let spaceKey = event.keyCode === 32 // Spacebar

        if (spaceKey && this.space_pressed === false) {
            this.start_titleAnimation = true;
            this.space_pressed = true;
        }
    }

    animate(ctx) {
        if (!this.titleAnimation_finished) {
            this.drawTitleScreen(ctx, this.title[0]);
            this.moveTitleScreen();
        }
    }

}