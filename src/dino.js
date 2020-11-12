const CONSTANTS = {
    DINO_WIDTH: 40,
    DINO_HEIGHT: 30
};

export default class Dino {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
    }

    drawDino(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);
    }

    animate(ctx) {
        this.drawDino(ctx);
    }
}
