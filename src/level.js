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
    PLAT_COUNTER: 0,
    DIFFICULTY_TIMER: 0,
    BORDER_WIDTH: 37,
    BORDER_HEIGHT: 2385,
    BORDER_SPEED: 3
};

const masterSprite = new Image();
masterSprite.src = "img/dino_sprite.png";

const birdLeftSprite = new Image();
birdLeftSprite.src = "img/dino_left.png";

const deadBirdSprite = new Image();
deadBirdSprite.src = "img/deadBird.png";

const cactusSprite = new Image();
cactusSprite.src = "img/cactus.png";

const platformSprite = new Image();
platformSprite.src = "img/platforms.png";

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.bonus = false;
        
        this.platforms = [
            this.startPlat(),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 2),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 6)
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

    // CHANGEPLACEMENT
    newCactus() {
        let randX = Math.floor(Math.random() * (460 - 35 + 1) + 35);

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

        if (CONSTANTS.DIFFICULTY_TIMER === 5) {
            this.cactus.push(this.newCactus());
            CONSTANTS.DIFFICULTY_TIMER = 6;
        };

        if (CONSTANTS.DIFFICULTY_TIMER === 50) {
            this.cactus.push(this.newCactus());
            CONSTANTS.DIFFICULTY_TIMER = 51;
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
        
        if (this.birds[0].x + CONSTANTS.BIRD_WIDTH < 0 || this.birds[0].x > 525 || this.birds[0].y > this.dimensions.height) {
            this.birds.shift();
            this.birds.push(this.newBird());
        }
    }
    
    eachBird(callback) {
        this.birds.forEach(callback.bind(this));
    }
    
    // 60 y for platform

    newBird() {
        let dX = Math.random() < 0.5 ? -74 : 515;
        let randY = Math.floor(Math.random() * (586 - 90 + 1) + 90);    // returns a random integer from 25 to 586

        let pos = ""
        
        if(dX === -74) {
            pos = "left";
        } else {
            pos = "right";
        }
         
        const bird = {
            x: dX,
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
                    masterSprite, 
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
                this.bonus = true;
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
        let randX = Math.floor(Math.random() * 450);
        let y = -30 * buffer; //draw cloud above canvas so it drops down into view

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

            if(cloud.y >= 15) {
                ctx.drawImage(
                    masterSprite,
                    174,
                    2,
                    cloud.width,
                    cloud.height,
                    cloud.x,
                    cloud.y,
                    cloud.width,
                    cloud.height
                );
            }
        });
    }

    startPlat() {
        const plat = {
            x: 190,
            y: 550,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: 0
        }

        CONSTANTS.PLAT_COUNTER += 1;
        
        return plat
    }
    
    randomPlat(minPlatDistance) {
        let randX = Math.floor(Math.random() * (400 - 35) + 35);
        let randY = Math.floor(Math.random() * (100 - 50)) + minPlatDistance;

        if (CONSTANTS.PLAT_COUNTER > 3) {
            CONSTANTS.PLAT_COUNTER = 0;
        }
        
        const plat = {
            x: randX,
            y: randY,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: CONSTANTS.PLAT_COUNTER
        }

        CONSTANTS.PLAT_COUNTER += 1;

        return plat;
    }
    
    pushNewPlat() {
        let randX = Math.floor(Math.random() * (400 - 35) + 35);

        if (CONSTANTS.PLAT_COUNTER > 3) {
            CONSTANTS.PLAT_COUNTER = 0;
        }
        
        const plat = {
            x: randX,
            y: -15,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT,
            counter: CONSTANTS.PLAT_COUNTER
        }

        CONSTANTS.PLAT_COUNTER += 1;
        CONSTANTS.DIFFICULTY_TIMER += 1;

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
    }

    collidesWith(dino) {
        const dino_y_offset = 60;

        //this function returns true if the dino and plat objects overlap
        const collisionCheck = (obj, dino) => {
            //check that they don't overlap in the x axis
            if (obj.x > dino.x + dino.width || obj.x + obj.width < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + dino_y_offset > obj.y + obj.height || dino.y + dino_y_offset < obj.y) {
                return false;
            }

            return true;
        };

        const cactus_x_offset = 20;
        const cactus_y_offset = 25;

        //this function returns true if the dino and cactuses overlap
        const cactusCheck = (cactus, dino) => {
            //check that they don't overlap in the x axis
            if (cactus.x + cactus_x_offset > dino.x + dino.width || cactus.x + cactus.width - cactus_x_offset < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + cactus_y_offset > cactus.y + cactus.height || dino.y + dino.height < cactus.y) {
                return false;
            }

            return true;
        };

        let collision = false;

        // Checks for collision with dino and all platforms
        this.eachPlat((plat) => {
            if (collisionCheck(plat, dino)) {
                collision = true;
            }
        });

        // Checks for collision with dino and birds. Sets bird.pos = "dead" to change bird sprite to dead bird sprite
        this.eachBird((bird) => {
            if (collisionCheck(bird, dino)) {
                collision = true;
                bird.pos = "dead";
            }
        });

        // Checks for collision with dino and cactus only after delay for cactus spawn
        this.eachCactus((cactus) => {
            if (cactus.timer > 55) {
                if (cactusCheck(cactus, dino)) {
                    collision = "cactus";
                }
            }
        });

        return collision;
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