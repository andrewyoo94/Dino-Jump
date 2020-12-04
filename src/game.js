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
        this.drawScore(this.ctx);

        // this.ctx.drawSprite(this.dinoSprite, 0, 0, 50, 50, 0, 0)

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
        this.score = 0;
        
        this.level = new Level(this.dimensions);
        this.dino = new Dino(this.dimensions);
        
        this.animate();
    }
    
    play() {
        this.running = true;
        this.animate();
    }

    // registerEvents() {
    //     this.boundClickHandler = this.input.bind(this);

    //     document.addEventListener("keydown", this.boundClickHandler {
    //         this.keys[e.key] = true;
    //     })

    //     document.addEventListener("keyup", this.boundClickHandler)  {
    //         delete this.keys[e.key];
    //     })
    // }

    // input() {
    //     if (this.keys[65]) { // A or Arrow_Left
    //         this.dino.controlDino("left");
    //     }
    //     if (this.keys[68]) { // D or Arrow_Right
    //         this.dino.controlDino("right");
    //     }
    // }

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

    drawScore(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 10, 20);
    }
}