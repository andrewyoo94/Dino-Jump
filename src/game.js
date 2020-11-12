import Level from "./level";
import Dino from "./dino";

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
    }

    animate() {
        //first we move and draw the level
        this.level.animate(this.ctx);
        this.dino.animate(this.ctx);
    }

    restart() {
        this.level = new Level(this.dimensions);
        this.dino = new Dino(this.dimensions);

        this.animate();
    }
}