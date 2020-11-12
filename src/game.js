import Level from "./level";

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
    }

    animate() {
        //first we move and draw the level
        this.level.animate(this.ctx);
    }

    restart() {
        this.level = new Level(this.dimensions);

        this.animate();
    }
}