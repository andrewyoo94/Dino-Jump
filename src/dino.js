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
dinoSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const dinoLeftSprite = new Image();
dinoLeftSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_left.png";

export default class Dino {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = 450;
        this.vel = 0;
        this.width = CONSTANTS.DINO_WIDTH;
        this.height = CONSTANTS.DINO_HEIGHT;
        this.direction = "";
    }

    drawDino(ctx) { 
        // ctx.fillStyle = "grey";
        // ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);
        
        if(this.direction==="left") {
            ctx.drawImage(dinoLeftSprite, 411 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);
        } else {
            ctx.drawImage(dinoSprite, 1678 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);
        }
    }

    moveDino() {
        //for each frame, the bird should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
        this.y += this.vel;
        //the acceleration of gravity is in pixels per second per second
        //so each second, it changes the velocity by whatever the gravity constant is
        this.vel += CONSTANTS.GRAVITY;
        //we set a 'terminal velocity', a maximum speed the bird can travel
        //this keeps the game from becoming too wild because the bird is moving too fast to control
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            //if the terminal velocity is exceeded, we set it to the terminal velicty
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    jump() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);
    }

    animate(ctx) {
        this.moveDino();

        this.drawDino(ctx);
    }

    controlDino(direction) {
        let acc = 0;

        if(direction=="left") {
            this.direction="left";
            
            acc = 9;

            this.x -= acc;
            CONSTANTS.FRAME_X += 1;
            
            if(CONSTANTS.FRAME_X == 4) {
                CONSTANTS.FRAME_X = 0;
            }
        } 

        if(direction=="right") {
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

    // reduceGravity() {
    //     this.vel += 0.002;
    // }
}
