const CONSTANTS = {
    PLAT_WIDTH: 100,
    PLAT_HEIGHT: 10
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        this.platforms = [ this.createPlat() ]
    }

    createPlat() {
        const plat = {
            dim: {
                x: 125,
                y: 500,
                width: CONSTANTS.PLAT_WIDTH,
                height: CONSTANTS.PLAT_HEIGHT
            },
        }
        return plat;
    }

    drawPlatforms(ctx) {
        ctx.fillStyle = "black";

        ctx.fillRect(
            this.platforms[0].dim.x,
            this.platforms[0].dim.y,
            this.platforms[0].dim.width,
            this.platforms[0].dim.height
        );
    }

    collidesWith(dino) {
        //this function returns true if the the rectangles overlap
        const _overlap = (plat, dino) => {
            debugger
            //check that they don't overlap in the x axis
            // if (plat.left > dino.right || plat.right < dino.left) {
            //     return false;
            // }
            //check that they don't overlap in the y axis
            if (plat.dim.x > dino.bottom || plat.dim.y < dino.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        
        // this.eachPipe((pipe) => {
            //check if the dino is overlapping (colliding) with either pipe

        if (_overlap(this.platforms[0], dino) ) {
            debugger 
            collision = true; 
        }

        // });

        return collision;
    }

    animate(ctx) {
        this.drawBackground(ctx);
        this.drawPlatforms(ctx);
    }

    drawBackground(ctx) {
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
}