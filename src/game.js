import Level from "./level";
import Dino from "./dino";

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();
    }

    animate() {
        //first we move and draw the level
        this.level.animate(this.ctx);
        this.dino.animate(this.ctx);

        if (this.running) {
            //This calls this function again, after around 1/60th of a second
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    restart() {
        this.running = false;
        
        this.level = new Level(this.dimensions);
        this.dino = new Dino(this.dimensions);

        this.animate();
    }

    play() {
        this.running = true;
        this.animate();
    }

    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }

    click(e) {
        if (!this.running) {
            this.play();
        }
        this.dino.jump();
    }
}