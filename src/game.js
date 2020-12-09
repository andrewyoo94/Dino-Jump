import Level from "./level";
import Dino from "./dino";

const CONSTANTS = {
    SCORE_WIDTH: 20
};

const scoreSprite = new Image();
scoreSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.score = 0;
        
        this.scorePlaceValues = [
            Math.floor(this.score % 10),
            Math.floor(this.score / 10 % 10),
            Math.floor(this.score / 100 % 10),
            Math.floor(this.score / 1000 % 10),
            Math.floor(this.score / 10000 % 10)
        ];
        
        this.restart();
    }

    updateScore() {
        this.scorePlaceValues = [
            Math.floor(this.score / 10000 % 10),
            Math.floor(this.score / 1000 % 10),
            Math.floor(this.score / 100 % 10),
            Math.floor(this.score / 10 % 10),
            Math.floor(this.score % 10)
        ];
    }

    drawScore(ctx) {
        for(let i = 0; i < 5; i++) {
            ctx.drawImage(
                scoreSprite, 
                1294 + (CONSTANTS.SCORE_WIDTH * this.scorePlaceValues[i]), 2,  //sX, sY
                18, 21, 
                360 + (25 * i), 0, 
                18, 21
            )
        }
    }

    isGameOver() {
        return (
            this.dino.isOutOfBounds() || this.level.deathFromBirdCheck(this.dino)
        );
        // this.level.collidesWith(this.dino) === "cactus" || 
    }
    
    animate() {
        this.level.animate(this.ctx);
        this.dino.animate(this.ctx);
        this.drawScore(this.ctx);
        this.score += 0.2;
        this.updateScore();

        if (this.level.collidesWith(this.dino)) {
            this.dino.jump();
        }

        if (this.isGameOver()) {
            alert(this.score);
            this.restart();
        }
    
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    restart() {
        this.running = true;
        this.score = 0;
        
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
        document.addEventListener("keyup", this.boundClickHandler);
    }

    input(event) {
        let leftKey = event.keyCode === 65 || event.keyCode === 37; // A or Arrow_Left
        let rightKey = event.keyCode === 68 || event.keyCode === 39; // D or Arrow_Right

        if (leftKey) {
            this.dino.controlDino("left");
        }
        if (rightKey) {
            this.dino.controlDino("right");
        }

        if (event.type === "keyup" && ( leftKey || rightKey)) {
            this.dino.controlDino("")
        }
    }
}