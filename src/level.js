const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 10,
    PLAT_START_HEIGHT: 550
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        // this.platforms = [ this.createPlat() ]

        const minPlatDistance = this.dimensions.height/4;

        this.platforms = [
            this.randomPlat(minPlatDistance),
            this.randomPlat(minPlatDistance)
        ];
    }

    randomPlat(minPlatDistance) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;

        const randX = Math.floor(Math.random() * this.dimensions.width);
        const randY = Math.floor(Math.random() * 60) + minPlatDistance;

        const plat = {
            x: randX,
            y: randY,
            width: CONSTANTS.PLAT_WIDTH,
            height: CONSTANTS.PLAT_HEIGHT
        }
        return plat
    }

    // createPlat() {
    //     const plat = {
    //         dim: {
    //             x: 125,
    //             y: CONSTANTS.PLAT_START_HEIGHT,
    //             width: CONSTANTS.PLAT_WIDTH,
    //             height: CONSTANTS.PLAT_HEIGHT
    //         },
    //     }

    //     return plat;
    // }

    // drawPlatforms(ctx) {
    //     ctx.fillStyle = "black";

    //     ctx.fillRect(
    //         this.platforms[0].dim.x,
    //         this.platforms[0].dim.y,
    //         this.platforms[0].dim.width,
    //         this.platforms[0].dim.height
    //     );
    // }











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

            if(plat.dim.x > dino.x + dino.width || plat.dim.x + CONSTANTS.PLAT_WIDTH < dino.x) {
                return false;
            }

            //check that they don't overlap in the y axis
            if (plat.dim.y > dino.y + dino.height) {
                return false;
            }
            return true;
        };
        let collision = false;

        // this.eachPipe((pipe) => {
        //check if the dino is overlapping (colliding) with either pipe

        if (_overlap(this.platforms[0], dino)) {
            collision = true;
        }

        // });

        return collision;
    }
}