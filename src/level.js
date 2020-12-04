const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 10,
    PLAT_START_HEIGHT: 450,
    MIN_PLAT_DIST: 330,
    PLAT_SPEED: 1,
    BIRD_WIDTH: 74,
    BIRD_HEIGHT: 54,
    BIRD_SPEED: 2,
    FRAME_X: 0,
    COUNTER: 0,
    STARTING_SX: 260,
    STARTING_SX_LEFT: 1997
};

const birdSprite = new Image();
birdSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const birdLeftSprite = new Image();
birdLeftSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_left.png";

const cloudSprite = new Image();
cloudSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const groundSprite = new Image();
groundSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_left.png";

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        this.platforms = [
            this.startPlat(),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 2),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 4)
        ];

        this.birds = [
            this.newBird()
        ];
    }
    
    // createBird() {
    //     if (this.birds.length == 0 || this.birds[0].y >= this.dimensions.height) {
    //         this.birds.shift();
    //         this.birds.push(this.newBird());
    //     }
    // }

    moveBirds() {
        this.eachBird(function (bird) {
            if(bird.pos == "left") {
                bird.x += CONSTANTS.BIRD_SPEED;
            } else {
                bird.x -= CONSTANTS.BIRD_SPEED;
            }
        })

        if (this.birds.length == 0) {
            this.birds.shift();
            this.birds.push(this.newBird());
        }
    }

    newBird() {
        let randX = Math.random() < 0.5 ? -74 : 480;
        let randY = Math.floor(Math.random() * 640);     // returns a random integer from 0 to 640
        let pos = ""

        if(randX == -74) {
            pos = "left";
        } else {
            pos = "right";
        }

        const bird = {
            x: randX,
            y: randY,
            width: CONSTANTS.BIRD_WIDTH,
            height: CONSTANTS.BIRD_HEIGHT,
            pos: pos
        }
        return bird;
    }

    
    drawBirds(ctx) {
        if(CONSTANTS.COUNTER < 5) {
            CONSTANTS.STARTING_SX = 260;
            CONSTANTS.STARTING_SX_LEFT = 1997;
        } else {
            CONSTANTS.STARTING_SX = 352;
            CONSTANTS.STARTING_SX_LEFT = 2089;
        }
        
        this.eachBird(function (bird) {
            ctx.fillStyle = "white";
            
            ctx.fillRect(
                bird.x,
                bird.y,
                bird.width,
                bird.height
                )
                
                if(bird.pos == "left") {
                    ctx.drawImage(
                        birdLeftSprite,
                        CONSTANTS.STARTING_SX_LEFT,
                        14,
                        92,
                        70,
                    bird.x,
                    bird.y,
                    CONSTANTS.BIRD_WIDTH,
                    CONSTANTS.BIRD_HEIGHT
                );
            } else {

                ctx.drawImage(
                    birdSprite, 
                    CONSTANTS.STARTING_SX, 
                    14, 
                    92, 
                    70, 
                    bird.x, 
                    bird.y,
                    CONSTANTS.BIRD_WIDTH, 
                    CONSTANTS.BIRD_HEIGHT
                    );
            }
            
        });
        CONSTANTS.COUNTER += 1;
        if (CONSTANTS.COUNTER >= 10) {
            CONSTANTS.COUNTER = 0;
        }
    }
    
    startPlat() {
        const plat = {
            x: 125,
            y: 550,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT
        }
        
        return plat
    }
    
    randomPlat(minPlatDistance) {
        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));
        let randY = Math.floor(Math.random() * 100) + minPlatDistance;
        
        const plat = {
            x: randX,
            y: randY,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT
        }
        return plat;
    }
    
    pushNewPlat() {
        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));
        
        const plat = {
            x: randX,
            y: 0,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT
        }
        return plat;
    }
    
    eachPlat(callback) {
        this.platforms.forEach(callback.bind(this));
    }
    
    eachBird(callback) {
        this.birds.forEach(callback.bind(this));
    }

    drawPlatforms(ctx) {
        this.eachPlat(function (plat) {
            ctx.fillStyle = "black";
            
            ctx.fillRect(
                plat.x,
                plat.y,
                plat.width,
                plat.height
                )
        });
    }
    
    movePlats() {
        this.eachPlat(function (plat) {
            plat.y += CONSTANTS.PLAT_SPEED;
        });

        //if a pipe has left the screen add a new one to the end
        if (this.platforms[0].y >= this.dimensions.height) {
            this.platforms.shift();
            const newY = this.platforms[1].y + CONSTANTS.MIN_PLAT_DIST;
            this.platforms.push(this.pushNewPlat());
        }
    }

    animate(ctx) {
        this.drawBackground(ctx);
        this.drawPlatforms(ctx);
        this.drawBirds(ctx);
        this.movePlats();
        this.moveBirds();
    }

    drawBackground(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);

        let randX = Math.floor(Math.random() * 480);
        let randY = Math.floor(Math.random() * 640);     // returns a random integer from 0 to 640

        ctx.drawImage(cloudSprite, 174, 2, 84, 27, this.x, this.y, 84, 27);
        ctx.drawImage(groundSprite, 174, 2, 84, 27, this.x, this.y, 84, 27);
    }

    collidesWith(dino) {
        //this function returns true if the the rectangles overlap
        const _overlap = (plat, dino) => {
            
            //check that they don't overlap in the x axis
            if(plat.x > dino.x + dino.width || plat.x + CONSTANTS.PLAT_WIDTH < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + 60 > plat.y + CONSTANTS.PLAT_HEIGHT || dino.y + 60 < plat.y ) {
                return false;
            }

            return true;
        };
        let collision = false;

        this.eachPlat((plat) => {
            if (_overlap(plat, dino)) { 
                collision = true; 
            } 
        });

        this.eachBird((bird) => {
            if (_overlap(bird, dino)) {
                collision = true;
            }
        })

        return collision;
    }
}