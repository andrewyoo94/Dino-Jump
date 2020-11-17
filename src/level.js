const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 10,
    PLAT_START_HEIGHT: 450  
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        const minPlatDistance = this.dimensions.height/2;

        this.platforms = [
            this.startPlat(),
            this.randomPlat(minPlatDistance)
        ];
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
        const randX = Math.floor(Math.random() * this.dimensions.width);
        const randY = Math.floor(Math.random() * 100) + minPlatDistance;

        const plat = {
            x: randX,
            y: randY,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT
        }
        return plat
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

    animate(ctx) {
        this.drawBackground(ctx);
        this.drawPlatforms(ctx);
    }

    drawBackground(ctx) {
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    collidesWith(dino) {
        //this function returns true if the the rectangles overlap
        const _overlap = (plat, dino) => {
            
            //check that they don't overlap in the x axis
            if(plat.x > dino.x + dino.width || plat.x + CONSTANTS.PLAT_WIDTH < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (plat.y > dino.y + dino.height) {
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

        return collision;
    }
}