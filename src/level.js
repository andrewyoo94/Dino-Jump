const CONSTANTS = {
    PIPE_WIDTH: 75
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        // this.platform = [
        //     this.randomPlatform(firstPlatformDistance)
            // this.randomPlatform(firstPlatformDistance + CONSTANTS.Platform_SPACING),
            // this.randomPlatform(firstPlatformDistance + (CONSTANTS.Platform_SPACING * 2)),
        // ];
    }

    // randomPlatform(x) {
    //     const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
    //     const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
    //     const platform = {
    //         dimensions: {
    //             left: x,
    //             right: CONSTANTS.PIPE_WIDTH + x,
    //             top: 0,
    //             bottom: gapTop
    //         },
    //         passed: false
    //     };
    //     return platform
    // }

    drawPlatforms(ctx) {
        ctx.fillStyle = "black";

        ctx.fillRect(
            125,
            500,
            100,
            10
        );
    }

    collidesWith(dino) {
        //this function returns true if the the rectangles overlap
        const _overlap = (plat, dino) => {
            //check that they don't overlap in the x axis
            if (plat.left > dino.right || plat.right < dino.left) {
                return false;
            }
            //check that they don't overlap in the y axis
            if (plat.top > dino.bottom || plat.bottom < dino.top) {
                return false;
            }
            return true;
        };
        let collision = false;

        // this.eachPipe((pipe) => {
            if (
                //check if the dino is overlapping (colliding) with either pipe
                _overlap(pipe.topPipe, dino) ||
                _overlap(pipe.bottomPipe, dino)
            ) { collision = true; }
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