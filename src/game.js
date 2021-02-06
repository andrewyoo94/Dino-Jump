import Level from "./level";
import Dino from "./dino";
import Title from "./title";

const CONSTANTS = {
    SCORE_WIDTH: 20,
    BORDER_WIDTH: 37,
    BORDER_HEIGHT: 2385,
    BORDER_SPEED: 3
};

const scoreSprite = new Image();
scoreSprite.src = "img/dino_sprite.png";

const highscoreSprite = new Image();
highscoreSprite.src = "img/highscoreSprite.png";

const sideBorderSprite = new Image();
sideBorderSprite.src = "img/border.png";

// const topBorderSprite = new Image();
// topBorderSprite.src = "/home/andrew/Desktop/dino_jump/img/cactus.png";

var jumpAudio = new Audio();
if (jumpAudio.canPlayType("audio/mp3")) {
    jumpAudio = new Audio("sounds/jump.mp3");
} else {
    jumpAudio = new Audio("sounds/jump.wav");
}

var deathAudio = new Audio();
if (deathAudio.canPlayType("audio/mp3")) {
    deathAudio = new Audio("sounds/death.mp3");
} else {
    deathAudio = new Audio("sounds/death.wav");
}

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();

        this.score = 0;
        this.highscore = localStorage.getItem("highscore") ?? 0;
        this.start_game = false;
        this.title = new Title(this.dimensions);

        this.moveBorder = true;

        this.borderLeft = [
            this.newBorder("left")
        ];

        this.borderRight = [
            this.newBorder("right")
        ];
        
        this.scorePlaceValues = [
            Math.floor(this.score % 10),
            Math.floor(this.score / 10 % 10),
            Math.floor(this.score / 100 % 10),
            Math.floor(this.score / 1000 % 10),
            Math.floor(this.score / 10000 % 10)
        ];

        this.highscorePlaceValues = [
            Math.floor(this.highscore / 10000 % 10),
            Math.floor(this.highscore / 1000 % 10),
            Math.floor(this.highscore / 100 % 10),
            Math.floor(this.highscore / 10 % 10),
            Math.floor(this.highscore % 10)
        ];
        
        this.restart();
    } 

    updateHighscore() {
        if (this.score > this.highscore) {
            localStorage.setItem("highscore", this.score);
            this.highscore = this.score;
        }

        this.highscorePlaceValues = [
            Math.floor(this.highscore / 10000 % 10),
            Math.floor(this.highscore / 1000 % 10),
            Math.floor(this.highscore / 100 % 10),
            Math.floor(this.highscore / 10 % 10),
            Math.floor(this.highscore % 10)
        ];
    }

    drawBorder(ctx) {
        this.eachBorderLeft(function (border) {
            ctx.drawImage(
                sideBorderSprite,
                12, 12,  //sX, sY      
                37, 2380,  // sW, sH
                border.x, border.y,
                border.width, border.height
            );
        });

        this.eachBorderRight(function (border) {
            ctx.drawImage(
                sideBorderSprite,
                90, 8,  //sX, sY       
                138, 2380,  // sW, sH
                border.x, border.y,
                border.width, border.height
            );
        });
    }

    // CHANGEPLACEMENT
    newBorder(side, dY) {
        let dX = side === "left" ? -1 : 500;
        let width = side === "left" ? 37 : 138
        dY = (typeof dY !== 'undefined') ? dY : -1750;

        const border = {
            x: dX,
            y: dY,
            width: width,
            height: CONSTANTS.BORDER_HEIGHT
        }
        return border;
    }

    eachBorderLeft(callback) {
        this.borderLeft.forEach(callback.bind(this));
    }

    eachBorderRight(callback) {
        this.borderRight.forEach(callback.bind(this));
    }

    moveBorders() {
        this.eachBorderLeft(function (border) {
            border.y += CONSTANTS.BORDER_SPEED;
        });

        this.eachBorderRight(function (border) {
            border.y += CONSTANTS.BORDER_SPEED;
        });

        //if top of border drops into frame push new border
        if (this.borderLeft[0].y + 640 >= 640 && this.borderLeft.length < 2) {
            this.borderLeft.push(this.newBorder("left", -2380));
        }

        if (this.borderRight[0].y + 640 >= 640 && this.borderRight.length < 2) {
            this.borderRight.push(this.newBorder("right", -2380));
        }

        if (this.borderLeft[0].y >= 640) {
            this.borderLeft.shift();
            this.borderRight.shift();
        }
    }

    drawTopBorder(ctx) {
        ctx.drawImage(
            titleSprite,
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
                // this.dimensions.width - (125) + (25 * i), 10,
                this.dimensions.width - (120) + (25 * i), 30, 
                18, 21
            )
        }
    }

    drawHighscore(ctx) {
        ctx.drawImage(
            highscoreSprite,
            1494, 2,  //sX, sY
            38, 21,
            this.dimensions.width - (175), 0,
            38, 21
        )

        for (let i = 0; i < 5; i++) {
            ctx.drawImage(
                highscoreSprite,
                1294 + (CONSTANTS.SCORE_WIDTH * this.highscorePlaceValues[i]), 2,  //sX, sY
                18, 21,
                this.dimensions.width - (120) + (25 * i), 0,
                18, 21
            )
        }
    }

    isGameOver() {
        return (
            this.dino.isOutOfBounds() || this.level.collidesWith(this.dino) === "cactus"
        );
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

        // if (this.title.space_pressed === true) {
            //     this.title.jump();
            //     this.title.space_pressed = false;
        // }
        
        if (this.title.titleAnimation_finished === true) {
            this.level.animate(this.ctx);
            this.dino.animate(this.ctx);
            // this.drawTopBorder(this.ctx);
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
                this.updateHighscore();
                this.drawGameOver(this.ctx);
                this.running = false;
            }
            
        }
        this.drawBorder(this.ctx);
        this.moveBorders();
        
        this.drawScore(this.ctx);
        this.drawHighscore(this.ctx);
        
        this.title.animate(this.ctx);
        if (this.running) {
            debugger
            requestAnimationFrame(this.animate.bind(this));
        }
    } 
    
    restart() {
        this.running = true;
        this.score = 0;
        
        this.level = new Level(this.dimensions, this.title);
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