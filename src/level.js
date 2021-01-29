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

const sideBorderSprite = new Image();
sideBorderSprite.src = "/home/andrew/Desktop/dino_jump/img/border.png";

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

const titleSprite = new Image();
titleSprite.src = "/home/andrew/Desktop/dino_jump/img/titleSprite.png";

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.bonus = false;
        this.start_titleAnimation = false;
        this.start_game = false;
        this.registerEvents();
        
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

        this.borderLeft = [
            this.newBorder("left")
        ];

        this.borderRight = [
            this.newBorder("right")
        ];

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

        if(this.title[0].y > 640) {
            this.title.shift();
            this.start_game = true;
        }
    }

    registerEvents() {
        this.boundClickHandler = this.input.bind(this);
        document.addEventListener("keydown", this.boundClickHandler);
    }

    input(event) {
        let spaceKey = event.keyCode === 32 // Spacebar

        if (this.start_game === false && spaceKey) {
            this.start_titleAnimation = true;
        }

        // if (spaceKey) { 
        //     this.start_titleAnimation = true;
        // }
    }

    drawBorder(ctx) {
        this.eachBorderLeft(function (border) {
            ctx.drawImage(
                sideBorderSprite,
                12, 12,  //sX, sY      
                37, 2380,  // sW, sH
                border.x, border.y,
                border.width, border.height
            );
        });

        this.eachBorderRight(function (border) {
            ctx.drawImage(
                sideBorderSprite,
                90, 8,  //sX, sY       
                138, 2380,  // sW, sH
                border.x, border.y,
                border.width, border.height
            );
        });
    }

    // CHANGEPLACEMENT
    newBorder(side, dY) {
        let dX = side === "left" ? -1 : 500;
        let width = side === "left" ? 37 : 138
        dY = (typeof dY !== 'undefined') ? dY : -1750;

        const border = {
            x: dX,
            y: dY,
            width: width,
            height: CONSTANTS.BORDER_HEIGHT
        }
        return border;
    }

    eachBorderLeft(callback) {
        this.borderLeft.forEach(callback.bind(this));
    }

    eachBorderRight(callback) {
        this.borderRight.forEach(callback.bind(this));
    }

    moveBorders() {
        this.eachBorderLeft(function (border) {
            border.y += CONSTANTS.BORDER_SPEED;
        });

        this.eachBorderRight(function (border) {
            border.y += CONSTANTS.BORDER_SPEED;
        });

        //if top of border drops into frame push new border
        if (this.borderLeft[0].y + 640 >= 640 && this.borderLeft.length < 2) {
            this.borderLeft.push(this.newBorder("left", -2380));
        }

        if (this.borderRight[0].y + 640 >= 640 && this.borderRight.length < 2) {
            this.borderRight.push(this.newBorder("right", -2380));
        }

        if (this.borderLeft[0].y >= 640) {
            this.borderLeft.shift();
            this.borderRight.shift();
        }
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
        //this function returns true if the the rectangles overlap
        const platformCheck = (plat, dino) => {
            //check that they don't overlap in the x axis
            if(plat.x > dino.x + dino.width || plat.x + plat.width < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + 60 > plat.y + plat.height || dino.y + 60 < plat.y ) {
                return false;
            }
            
            return true;
        };
        
        const cactusCheck = (cactus, dino) => {
            //check that they don't overlap in the x axis
            if (cactus.x + 20 > dino.x + dino.width || cactus.x + cactus.width - 20 < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (dino.y + 25 > cactus.y + cactus.height || dino.y + dino.height < cactus.y) {
                return false;
            }

            return true;
        };

        let collision = false;

        this.eachPlat((plat) => {
            if (platformCheck(plat, dino)) { 
                collision = true; 
            } 
        });

        this.eachBird((bird) => {
            if (platformCheck(bird, dino)) {
                collision = true;
                bird.pos = "dead";
            }
        });

        this.eachCactus((cactus) => {
            if (cactus.timer > 55) {
                if (cactusCheck(cactus, dino)) {
                    collision = "cactus";
                }
            }
        });
        
        return collision;
    }

    // deathFromBirdCheck(dino) {
    //     // const check = (bird, dino) => {
    //     //     // let dinoTopBirdBottom = 
    //     //     //     bird.y + CONSTANTS.BIRD_HEIGHT > dino.y &&
    //     //     //     (bird.x < dino.x + dino.width || bird.x + CONSTANTS.BIRD_WIDTH > dino.x);

    //     //     const adjustedHitboxBottom = 2;
    //     //     const adjustedHitboxRight = 2;
            
    //     //     // if (bird.y + CONSTANTS.BIRD_HEIGHT - adjustedHitbox > dino.y) {
    //     //     //     debugger
    //     //     //     return true;
    //     //     // }

    //     //     let testCollision = 0;
    //     //     let test1 = 0;
    //     //     let test2 = 0;
    //     //     let test3 = 0;
    //     //     let test4 = 0;

    //     //     if (bird.y + CONSTANTS.BIRD_HEIGHT - 25 > dino.y && dino.y > bird.y + CONSTANTS.BIRD_HEIGHT - 25) {
    //     //         testCollision += 1; 
    //     //         test1 += 1;
    //     //     }

    //     //     if (bird.x < dino.x + dino.width) {
    //     //         testCollision += 1;
    //     //         test2 += 1;
    //     //     }

    //     //     if (bird.x + CONSTANTS.BIRD_WIDTH > dino.x) {
    //     //         testCollision += 1;
    //     //         test3 += 1;
    //     //     }

    //     //     // if ( bird.y < (dino.y + 50) < bird.y + 60) {
    //     //     //     test4 += 1;
    //     //     //     testCollision += 1;
    //     //     // }

    //     //     // if (dinoTopBirdBottom) {
    //     //     //     debugger
    //     //     //     return true;
    //     //     // }

    //     //     if (testCollision === 3) {
    //     //         debugger
    //     //         console.log(test1,test2,test3,test4)
    //     //         return true;
    //     //     }

    //     //     return false;
    //     // };


    //     const check = (bird, dino) => {

    //         const adjustedHitboxRightOfBird = 10;

    //         //check that they don't overlap in the x axis
    //         if (bird.x + adjustedHitboxRightOfBird > dino.x + dino.width || bird.x + CONSTANTS.BIRD_WIDTH - adjustedHitboxRightOfBird < dino.x) {
    //             return false;
    //         }

    //         //check that they don't overlap in the y axis
    //         if (dino.y + 25 > bird.y + CONSTANTS.BIRD_HEIGHT || dino.y + dino.height < bird.y - 25) {
    //             return false;
    //         }

    //         return true;
    //     };
    //     let collision = false;

    //     this.eachBird((bird) => {
    //         if (check(bird, dino)) {
    //             collision = true;
    //         } 
    //         // return check(bird, dino);
    //     });

    //     return collision;
    // }
    
    animate(ctx) {
        if (this.start_game === true) {
            this.drawBackground(ctx);
            this.drawClouds(ctx);
            this.drawPlatforms(ctx);
            this.drawCactus(ctx);
            this.drawBirds(ctx);
            this.movePlats();
            this.moveBirds();
            this.moveCactus();
            this.moveClouds();
            this.moveBorders();
        }
        
        this.drawBorder(ctx);

        if(this.title.length === 1) {
            this.drawTitleScreen(ctx, this.title[0]);

            // if (this.start_titleAnimation) { 
                this.moveTitleScreen();
            // }
        }

    }
}