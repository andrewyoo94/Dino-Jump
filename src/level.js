const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 10,
    PLAT_START_HEIGHT: 450,
    MIN_PLAT_DIST: 330,
    PLAT_SPEED: 2  
};

const cloudSprite = new Image();
cloudSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        this.platforms = [
            this.startPlat(),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 2),
            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 4)
        ];

        // this.clouds = [
        // ];
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
        // this.movePlats();
    }

    drawBackground(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);

        ctx.drawImage(cloudSprite, 174, 2, 84, 27, this.x, this.y, 84, 27);
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

            // if (plat.y > dino.y + dino.height && ) {
            //     return false;
            // }

            return true;
        };
        let collision = false;

        this.eachPlat((plat) => {
            if (_overlap(plat, dino)) { 
                collision = true; 
            }
        });

        return collision;
    }
}