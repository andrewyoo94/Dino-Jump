const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 15,
    PLAT_START_HEIGHT: 450,
    MIN_PLAT_DIST: 330,
    PLAT_SPEED: 1,
    BIRD_WIDTH: 74,
    BIRD_HEIGHT: 54,
    BIRD_SPEED: 2,
    FRAME_X: 0,
    COUNTER: 0,
    STARTING_SX: 260,
    STARTING_SX_LEFT: 1997,
    CLOUD_SPEED: 0.5,
    PLAT_ARR: [1, 103, 205, 307],
    PLAT_COUNTER: 0
};

const birdSprite = new Image();
birdSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const birdLeftSprite = new Image();
birdLeftSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_left.png";

const deadBirdSprite = new Image();
deadBirdSprite.src = "/home/andrew/Desktop/dino_jump/img/deadBird.png";

const cloudSprite = new Image();
cloudSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const groundSprite = new Image();
groundSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_left.png";

const cactusSprite = new Image();
cactusSprite.src = "/home/andrew/Desktop/dino_jump/img/cactus.png";

const platformSprite = new Image();
platformSprite.src = "/home/andrew/Desktop/dino_jump/img/platforms.png";

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
        
        this.clouds = [
            this.randomCloud(1),
            this.randomCloud(Math.random() * (12 - 10) + 10),
            this.randomCloud(Math.random() * (24 - 20) + 20)
        ];

        this.cactus = [
            this.newCactus()
        ];
    }
    
    eachCactus(callback) {
        this.cactus.forEach(callback.bind(this));   
    }

    drawCactus(ctx) {
        this.eachCactus(function(cactus) {
            if(cactus.timer % 6 && cactus.timer < 50) {
                ctx.drawImage(
                    cactusSprite,
                    1791,
                    60,
                    32,
                    70,
                    cactus.x,
                    cactus.y,
                    cactus.width,
                    cactus.height
                );
            } 
            if(cactus.timer >= 50) {
                ctx.drawImage(
                    cactusSprite,
                    1791,
                    60,
                    32,
                    70,
                    cactus.x,
                    cactus.y,
                    cactus.width,
                    cactus.height
                );
            }
            cactus.timer += 1;
        });
    }

    newCactus() {
        let randX = Math.floor(Math.random() * 443);

        const cactus = {
            x: randX,
            y: 0,
            width: 37,
            height: 63,
            timer: 0
        }
        return cactus;
    }

    moveCactus() {
        this.eachCactus(function (cactus) {
            if(cactus.timer > 55) {
                cactus.y += 7;
            }
        });

        if (this.cactus[0].y > this.dimensions.height) {
            this.cactus.shift();
            this.cactus.push(this.newCactus());
        };
    }
        
    moveBirds() {
        this.eachBird(function (bird) {
            if(bird.pos == "left") {
                bird.x += CONSTANTS.BIRD_SPEED;
            } if(bird.pos == "right") {
                bird.x -= CONSTANTS.BIRD_SPEED;
            } if(bird.pos == "dead") {
                bird.y += 7;
            }
        })
        
        if (this.birds[0].x + CONSTANTS.BIRD_WIDTH < 0 || this.birds[0].x > this.dimensions.width || this.birds[0].y > this.dimensions.height) {
            this.birds.shift();
            this.birds.push(this.newBird());
        }
    }
    
    eachBird(callback) {
        this.birds.forEach(callback.bind(this));
    }
    
    newBird() {
        let randX = Math.random() < 0.5 ? -74 : 480;
        let randY = Math.floor(Math.random() * 586);     // returns a random integer from 0 to 640
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
            } if(bird.pos == "right") {
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
            } if (bird.pos == "dead") {
                ctx.drawImage(
                    deadBirdSprite,
                    2,
                    2089,
                    80,
                    92,
                    bird.x,
                    bird.y,
                    64,
                    74
                );
            }
        });

        CONSTANTS.COUNTER += 1;
        if (CONSTANTS.COUNTER >= 10) {
            CONSTANTS.COUNTER = 0;
        }
    }

    randomCloud(buffer) {
        let randX = Math.floor(Math.random() * 500) - 42;
        let y = -27 * buffer; //draw cloud above canvas so it drops down into view

        const cloud = {
            x: randX,
            y: y,
            width: 84,
            height: 27
        }
        return cloud;
    }

    eachCloud(callback) {
        this.clouds.forEach(callback.bind(this));
    }
    
    moveClouds() {
        this.eachCloud(function (cloud) {
            cloud.y += CONSTANTS.CLOUD_SPEED;
        });

        //if a cloud has left the bottom of the screen add a new one to the end
        if (this.clouds[0].y >= this.dimensions.height) {
            this.clouds.shift();
            this.clouds.push(this.randomCloud(1));
        }
    }

    drawClouds(ctx) {
        this.eachCloud(function (cloud) {
            ctx.drawImage(
                cloudSprite,
                174,
                2,
                cloud.width,
                cloud.height,
                cloud.x,
                cloud.y,
                cloud.width,
                cloud.height
            );
        });
    }

    startPlat() {
        const plat = {
            x: 125,
            y: 550,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: 0
        }

        CONSTANTS.PLAT_COUNTER += 1;
        
        return plat
    }
    
    randomPlat(minPlatDistance) {
        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));
        let randY = Math.floor(Math.random() * 100) + minPlatDistance;
        
        const plat = {
            x: randX,
            y: randY,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: CONSTANTS.PLAT_COUNTER
        }

        CONSTANTS.PLAT_COUNTER += 1;
        if(CONSTANTS.PLAT_COUNTER === 3) {
            CONSTANTS.PLAT_COUNTER = 0;
        }

        return plat;
    }
    
    pushNewPlat() {
        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));
        
        const plat = {
            x: randX,
            y: 0,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: CONSTANTS.PLAT_COUNTER
        }

        CONSTANTS.PLAT_COUNTER += 1;
        if (CONSTANTS.PLAT_COUNTER === 3) {
            CONSTANTS.PLAT_COUNTER = 0;
        }

        return plat;
    }
    
    eachPlat(callback) {
        this.platforms.forEach(callback.bind(this));
    }

    drawPlatforms(ctx) {
        this.eachPlat(function (plat) {

            let x = CONSTANTS.PLAT_ARR[plat.counter]

            ctx.drawImage(
                platformSprite,
                x,
                1,
                100,
                15,
                plat.x,
                plat.y,
                plat.width,
                plat.height
            );
        });
    }

    movePlats() {
        this.eachPlat(function (plat) {
            plat.y += CONSTANTS.PLAT_SPEED;
        });

        if (this.platforms[0].y >= this.dimensions.height) {
            this.platforms.shift();
            const newY = this.platforms[1].y + CONSTANTS.MIN_PLAT_DIST;
            this.platforms.push(this.pushNewPlat());
        }
    }
    
    drawBackground(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);

        // ctx.drawImage(groundSprite, 174, 2, 84, 27, randX, y, 84, 27);
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
                bird.pos = "dead";
            }
        });

        this.eachCactus((cactus) => {
            if(_overlap(cactus, dino)) {
                return "cactus";
            }
        });
        
        return collision;
    }

    deathFromBirdCheck(dino) {
        const check = (obj, dino) => {
            //check that they don't overlap in the x axis
            if (plat.x > dino.x + dino.width || plat.x + CONSTANTS.PLAT_WIDTH < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + 60 > plat.y + CONSTANTS.PLAT_HEIGHT || dino.y + 60 < plat.y) {
                return false;
            }

            return true;
        };

        this.eachBird((bird) => {
            if (check(bird, dino)) {
                return true;
            }
        });
    }
    
    animate(ctx) {
        this.drawBackground(ctx);
        this.drawClouds(ctx);
        this.drawPlatforms(ctx);
        this.drawCactus(ctx);
        this.drawBirds(ctx);
        this.movePlats();
        this.moveBirds();
        this.moveCactus();
        this.moveClouds();
    }
}