const CONSTANTS = {
    DINO_WIDTH: 70,
    DINO_HEIGHT: 72,
    GRAVITY: 0.25,
    TERMINAL_VEL: 10,
    JUMP_SPEED: 12,
    FRAME_X: 0,
    FRAME_Y: 0
};

const dinoSprite = new Image();
dinoSprite.src = "img/dino_sprite.png";

const dinoLeftSprite = new Image();
dinoLeftSprite.src = "img/dino_left.png";

export default class Dino {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = 205;
        this.y = 450;
        this.vel = 0;
        this.width = CONSTANTS.DINO_WIDTH;
        this.height = CONSTANTS.DINO_HEIGHT;
        this.direction = "";
    }

    drawDino(ctx) {
        if(this.direction==="left") {
            ctx.drawImage(dinoLeftSprite, 411 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);
        } else {
            ctx.drawImage(dinoSprite, 1678 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);
        }
    }

    moveDino() {
        this.y += this.vel;
        this.vel += CONSTANTS.GRAVITY;

        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    jump() {
        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);
    }

    animate(ctx) {
        this.moveDino();

        this.drawDino(ctx);
    }

    controlDino(direction) {
        let acc = 0;

        if(direction=="left" && this.x > 35) {
            this.direction="left";
            
            acc = 9;

            this.x -= acc;
            CONSTANTS.FRAME_X += 1;
            
            if(CONSTANTS.FRAME_X == 4) {
                CONSTANTS.FRAME_X = 0;
            }
        } 

        if(direction=="right" && this.x < 430) {
            this.direction = "right";
            acc = 9;

            this.x += acc;
            CONSTANTS.FRAME_X += 1;
            if (CONSTANTS.FRAME_X == 4) {
                CONSTANTS.FRAME_X = 0;
            }
        }
    }

    isOutOfBounds() {
        if (this.y + CONSTANTS.DINO_HEIGHT > 640) {
            return true;
        };
    };
}
