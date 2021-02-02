const titleSprite = new Image();
titleSprite.src = "/home/andrew/Desktop/dino_jump/img/titleSprite.png";

export default class Title {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.start_titleAnimation = false;
        this.titleAnimation_finished = false;
        this.registerEvents();

        this.title = [
            this.newTitle()
        ];
    }

    newTitle() {
        const title = {
            x: 44,
            y: 0,
            width: 448,
            height: 52
        };
        return title;
    }

    drawTitleScreen(ctx, title) {
        ctx.drawImage(
            titleSprite,
            0, 0,  //sX, sY      lessen height to move line up
            498, 52,  //           lessen this height after to shorten bottem
            title.x, title.y,
            title.width, title.height
        )
    }

    moveTitleScreen() {
        if (this.title[0].y < 640 && this.start_titleAnimation === true) {
            this.title[0].y += 3;
        }

        if (this.title[0].y > 640) {
            this.title.shift();
            this.titleAnimation_finished  = true;
        }
    }

    registerEvents() {
        this.boundClickHandler = this.input.bind(this);
        document.addEventListener("keydown", this.boundClickHandler);
    }

    input(event) {
        let spaceKey = event.keyCode === 32 // Spacebar

        if (spaceKey) {
            this.start_titleAnimation = true;
        }
    }

    animate(ctx) {
        if (!this.titleAnimation_finished) {
            this.drawTitleScreen(ctx, this.title[0]);
            this.moveTitleScreen();
        }
    }

}