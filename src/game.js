import Level from "./level";
import Dino from "./dino";

const CONSTANTS = {
    SCORE_WIDTH: 20
};

const scoreSprite = new Image();
scoreSprite.src = "/home/andrew/Desktop/dino_jump/img/dino_sprite.png";

const topBorderSprite = new Image();
topBorderSprite.src = "/home/andrew/Desktop/dino_jump/img/cactus.png";

var jumpAudio = new Audio();
if (jumpAudio.canPlayType("audio/mp3")) {
    jumpAudio = new Audio("/home/andrew/Desktop/dino_jump/sounds/jump.mp3");
} else {
    jumpAudio = new Audio("/home/andrew/Desktop/dino_jump/sounds/jump.wav");
}

var deathAudio = new Audio();
if (deathAudio.canPlayType("audio/mp3")) {
    deathAudio = new Audio("/home/andrew/Desktop/dino_jump/sounds/death.mp3");
} else {
    deathAudio = new Audio("/home/andrew/Desktop/dino_jump/sounds/death.wav");
}

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

    drawTopBorder(ctx) {
        ctx.drawImage(
            topBorderSprite,
            1000, 2,  //sX, sY      lessen height to move line up
            480, 24,  //           lessen this height after to shorten bottem
            0, 0,
            480, 24
        )
    }

    bonusPoints() {
        this.score += 1;
    }

    increaseDifficulty() {
        this.level.cactus.push(this.level.newCactus());
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


    // CHANGEPLACEMENT 
    drawScore(ctx) {
        for(let i = 0; i < 5; i++) {
            ctx.drawImage(
                scoreSprite, 
                1294 + (CONSTANTS.SCORE_WIDTH * this.scorePlaceValues[i]), 2,  //sX, sY
                18, 21, 
                this.dimensions.width - (125) + (25 * i), 10, 
                18, 21
            )
        }
    }

    isGameOver() {
        return (
            this.dino.isOutOfBounds() || this.level.collidesWith(this.dino) === "cactus"
        );
        // this.level.deathFromBirdCheck(this.dino)
    }

    // CHANGEPLACEMENT
    drawGameOver(ctx) {
        ctx.drawImage(
            scoreSprite,
            1294, 29,
            381, 21,
            77.5, 100,
            381, 21
        );

        ctx.drawImage(
            scoreSprite,
            2, 2,
            72, 64,
            232, 175,
            72, 64
        );
    }
    
    animate() {
        this.level.animate(this.ctx);
        // this.drawTopBorder(this.ctx);
        this.dino.animate(this.ctx);
        this.drawScore(this.ctx);
        this.score += 0.2;
        if(this.level.bonus) {
            this.bonusPoints();
            this.level.bonus = false;
        }
        this.updateScore();
        
        
        if (this.level.collidesWith(this.dino)) {
            this.dino.jump();
            jumpAudio.play();
        }

        if (this.isGameOver()) {
            deathAudio.play();
            this.drawGameOver(this.ctx);
            this.running = false;

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
        let spaceKey = event.keyCode === 32 // Spacebar

        if (leftKey) {
            this.dino.controlDino("left");
        }
        if (rightKey) {
            this.dino.controlDino("right");
        }

        if (event.type === "keyup" && ( leftKey || rightKey)) {
            this.dino.controlDino("")
        }

        if (this.running === false && spaceKey) {
            this.restart();
        }
    }
}