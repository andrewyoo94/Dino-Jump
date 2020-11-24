import Level from "./level";
import Dino from "./dino";

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();
        this.dinoSprite = new Image(); 
        dinoSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";
    }

    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        this.ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }
    
    animate() {
        //first we move and draw the level
        this.level.animate(this.ctx);
        this.dino.animate(this.ctx);

        this.ctx.drawSprite(this.dinoSprite, 0, 0, 50, 50, 0, 0)

        if (this.level.collidesWith(this.dino)) {
            this.dino.jump();
        }
    
        if (this.running) {
            //This calls this function again, after around 1/60th of a second
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    restart() {
        this.running = true;
        
        this.level = new Level(this.dimensions);
        this.dino = new Dino(this.dimensions);
        
        this.animate();
    }
    
    play() {
        this.running = true;
        this.animate();
    }

    registerEvents() {
        this.boundClickHandler = this.input.bind(this);
        document.addEventListener("keydown", this.boundClickHandler);
    }

    input(event) {
        if (event.keyCode === 65 || event.keyCode === 37) { // A or Arrow_Left
            this.dino.controlDino("left");
        }
        if (event.keyCode === 68 || event.keyCode === 39) { // D or Arrow_Right
            this.dino.controlDino("right");
        }
    }
}