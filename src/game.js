import Level from "./level";
import Dino from "./dino";

const keys = []

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();

        // this.keys = [];
    }
    
    animate() {
        //first we move and draw the level
        this.level.animate(this.ctx);
        this.dino.animate(this.ctx);
        this.move();

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
    }

    input(event) {
        document.addEventListener("keydown", function(e) {
            keys[e.key] = true;
        })

        document.addEventListener("keyup", function(e)  {
            delete keys[e.key];
        })

        if (keys[65]) { // A or Arrow_Left
            this.dino.controlDino("left");
        }
        if (keys[68]) { // D or Arrow_Right
            this.dino.controlDino("right");
        }
    }

    move() {
        debugger
        if (keys[65]) { // A or Arrow_Left
            this.dino.controlDino("left");
        }
        if (keys[68]) { // D or Arrow_Right
            this.dino.controlDino("right");
        }
    }
}