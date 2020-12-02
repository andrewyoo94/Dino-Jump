/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dino.js":
/*!*********************!*\
  !*** ./src/dino.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Dino\n/* harmony export */ });\nconst CONSTANTS = {\n    DINO_WIDTH: 70,\n    DINO_HEIGHT: 72,\n    GRAVITY: 0.25,\n    TERMINAL_VEL: 10,\n    JUMP_SPEED: 12,\n    FRAME_X: 0,\n    FRAME_Y: 0\n};\n\nconst dinoSprite = new Image();\ndinoSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_sprite.png\";\n\nconst dinoLeftSprite = new Image();\ndinoLeftSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_left.png\";\n\nclass Dino {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = this.dimensions.width / 3;\n        this.y = 450;\n        this.vel = 0;\n        this.width = CONSTANTS.DINO_WIDTH;\n        this.height = CONSTANTS.DINO_HEIGHT;\n        this.direction = \"\"\n    }\n\n    drawDino(ctx) { \n        ctx.fillStyle = \"grey\";\n        ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);\n        \n        if(this.direction===\"left\") {\n            ctx.drawImage(dinoLeftSprite, 411 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);\n        } else {\n            ctx.drawImage(dinoSprite, 1678 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);\n        }\n    }\n\n    moveDino() {\n        //for each frame, the bird should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n        this.y += this.vel;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        this.vel += CONSTANTS.GRAVITY;\n        //we set a 'terminal velocity', a maximum speed the bird can travel\n        //this keeps the game from becoming too wild because the bird is moving too fast to control\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n    }\n\n    jump() {\n        //if this were a more realistic bird simulation, we would be adding to the velocity\n        //instead of just assigning it outright\n        //to make the experience more fun and 'bouncy' we just set it directly\n        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);\n    }\n\n    animate(ctx) {\n        this.moveDino();\n        if (this.isOutOfBounds(this.x) == \"left\") {\n            this.drawDino(ctx, this.dimensions.x);\n        }  \n        if (this.isOutOfBounds(this.x) == \"right\"){\n            this.drawDino(ctx, 0);\n        }\n        this.drawDino(ctx);\n    }\n\n    controlDino(direction) {\n        if(direction==\"left\") {\n            this.direction=\"left\";\n            \n            this.x -= 9;\n            CONSTANTS.FRAME_X += 1;\n            \n            if(CONSTANTS.FRAME_X == 4) {\n                CONSTANTS.FRAME_X = 0;\n            }\n        } \n\n        if(direction==\"right\") {\n            this.direction = \"right\";\n\n            this.x += 9;\n            CONSTANTS.FRAME_X += 1;\n            if (CONSTANTS.FRAME_X == 4) {\n                CONSTANTS.FRAME_X = 0;\n            }\n        }\n    }\n\n    // isOutOfBounds(x) {\n    //     if (x < 0 || x > this.dimensions.width) {\n    //         return true;\n    //     };\n    //     return false;\n    // };\n\n    isOutOfBounds(x) {\n        if (x < 0) {\n            return \"left\"\n        };\n        if (x > this.dimensions.width) {\n            return \"right\";\n        };\n        return false;\n    };\n\n    wrap(x) {\n        debugger\n        if (x > this.dimensions.x) {\n            this.x = 0;\n        }\n        if (x < 0) {\n            this.x = this.dimensions.x;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://trex_jump/./src/dino.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _dino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\n;\n\n\nclass Game {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n    }\n    \n    animate() {\n        //first we move and draw the level\n        this.level.animate(this.ctx);\n        this.dino.animate(this.ctx);\n\n        // this.ctx.drawSprite(this.dinoSprite, 0, 0, 50, 50, 0, 0)\n\n        if (this.level.collidesWith(this.dino)) {\n            this.dino.jump();\n        }\n    \n        if (this.running) {\n            //This calls this function again, after around 1/60th of a second\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n\n    restart() {\n        this.running = true;\n        \n        this.level = new _level__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n        this.dino = new _dino__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n        \n        this.animate();\n    }\n    \n    play() {\n        this.running = true;\n        this.animate();\n    }\n\n    // registerEvents() {\n    //     this.boundClickHandler = this.input.bind(this);\n\n    //     document.addEventListener(\"keydown\", this.boundClickHandler {\n    //         this.keys[e.key] = true;\n    //     })\n\n    //     document.addEventListener(\"keyup\", this.boundClickHandler)  {\n    //         delete this.keys[e.key];\n    //     })\n    // }\n\n    // input() {\n    //     if (this.keys[65]) { // A or Arrow_Left\n    //         this.dino.controlDino(\"left\");\n    //     }\n    //     if (this.keys[68]) { // D or Arrow_Right\n    //         this.dino.controlDino(\"right\");\n    //     }\n    // }\n\n    registerEvents() {\n        this.boundClickHandler = this.input.bind(this);\n        document.addEventListener(\"keydown\", this.boundClickHandler);\n    }\n\n    input(event) {\n        if (event.keyCode === 65 || event.keyCode === 37) { // A or Arrow_Left\n            this.dino.controlDino(\"left\");\n        }\n        if (event.keyCode === 68 || event.keyCode === 39) { // D or Arrow_Right\n            this.dino.controlDino(\"right\");\n        }\n    }\n}\n\n//# sourceURL=webpack://trex_jump/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n;\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('game');\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n});\n\n//# sourceURL=webpack://trex_jump/./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Level\n/* harmony export */ });\nconst CONSTANTS = {\n    PLAT_WIDTH: 100,\n    PLAT_HEIGHT: 10,\n    PLAT_START_HEIGHT: 450,\n    MIN_PLAT_DIST: 330,\n    PLAT_SPEED: 1,\n    BIRD_WIDTH: 74,\n    BIRD_HEIGHT: 54,\n    BIRD_SPEED: 2,\n    FRAME_X: 0\n};\n\n// const cloudSprite = new Image();\n// cloudSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_sprite.png\";\n\nconst birdSprite = new Image();\nbirdSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_sprite.png\";\n\nconst birdLeftSprite = new Image();\nbirdLeftSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_left.png\";\n\n// const dinoLeftSprite = new Image();\n// dinoLeftSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_left.png\";\n\nclass Level {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        this.platforms = [\n            this.startPlat(),\n            this.randomPlat(CONSTANTS.MIN_PLAT_DIST),\n            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 2),\n            this.randomPlat(CONSTANTS.MIN_PLAT_DIST / 4)\n        ];\n\n        this.birds = [\n            this.newBird()\n        ];\n    }\n    \n    // createBird() {\n    //     if (this.birds.length == 0 || this.birds[0].y >= this.dimensions.height) {\n    //         this.birds.shift();\n    //         this.birds.push(this.newBird());\n    //     }\n    // }\n\n    moveBirds() {\n        this.eachBird(function (bird) {\n            if(bird.pos == \"left\") {\n                bird.x += CONSTANTS.BIRD_SPEED;\n            } else {\n                bird.x -= CONSTANTS.BIRD_SPEED;\n            }\n        })\n\n        if (this.birds.length == 0) {\n            this.birds.shift();\n            this.birds.push(this.newBird());\n        }\n    }\n\n    newBird() {\n        let randX = Math.random() < 0.5 ? -74 : 480;\n        let randY = Math.floor(Math.random() * 640);     // returns a random integer from 0 to 640\n        let pos = \"\"\n\n        if(randX == -74) {\n            pos = \"left\";\n        } else {\n            pos = \"right\";\n        }\n\n        const bird = {\n            x: randX,\n            y: randY,\n            width: CONSTANTS.BIRD_WIDTH,\n            height: CONSTANTS.BIRD_HEIGHT,\n            pos: pos\n        }\n        return bird;\n    }\n\n    eachBird(callback) {\n        this.birds.forEach(callback.bind(this));\n    }\n\n    drawBirds(ctx) {\n        this.eachBird(function (bird) {\n            ctx.fillStyle = \"white\";\n\n            ctx.fillRect(\n                bird.x,\n                bird.y,\n                bird.width,\n                bird.height\n            )\n            \n            if(bird.pos == \"left\") {\n                ctx.drawImage(\n                    birdLeftSprite,\n                    1997,\n                    14,\n                    92,\n                    70,\n                    bird.x,\n                    bird.y,\n                    CONSTANTS.BIRD_WIDTH,\n                    CONSTANTS.BIRD_HEIGHT\n                );\n            } else {\n                ctx.drawImage(\n                    birdSprite, \n                    260 + (CONSTANTS.FRAME_X * 92), \n                    14, \n                    92, \n                    70, \n                    bird.x, \n                    bird.y,\n                    CONSTANTS.BIRD_WIDTH, \n                    CONSTANTS.BIRD_HEIGHT\n                );\n            }\n\n            if (CONSTANTS.FRAME_X == 1) {\n                CONSTANTS.FRAME_X = 0;\n            }\n        });\n    }\n\n    startPlat() {\n        const plat = {\n            x: 125,\n            y: 550,\n            width: CONSTANTS.PLAT_WIDTH,\n            height: CONSTANTS.PLAT_HEIGHT\n        }\n\n        return plat\n    }\n\n    randomPlat(minPlatDistance) {\n        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));\n        let randY = Math.floor(Math.random() * 100) + minPlatDistance;\n\n        const plat = {\n            x: randX,\n            y: randY,\n            width: CONSTANTS.PLAT_WIDTH,\n            height: CONSTANTS.PLAT_HEIGHT\n        }\n        return plat;\n    }\n\n    pushNewPlat() {\n        let randX = Math.floor(Math.random() * (this.dimensions.width - CONSTANTS.PLAT_WIDTH + 1));\n\n        const plat = {\n            x: randX,\n            y: 0,\n            width: CONSTANTS.PLAT_WIDTH,\n            height: CONSTANTS.PLAT_HEIGHT\n        }\n        return plat;\n    }\n\n    eachPlat(callback) {\n        this.platforms.forEach(callback.bind(this));\n    }\n\n    drawPlatforms(ctx) {\n        this.eachPlat(function (plat) {\n            ctx.fillStyle = \"black\";\n\n            ctx.fillRect(\n                plat.x,\n                plat.y,\n                plat.width,\n                plat.height\n            )\n        });\n    }\n\n    movePlats() {\n        this.eachPlat(function (plat) {\n            plat.y += CONSTANTS.PLAT_SPEED;\n        });\n\n        //if a pipe has left the screen add a new one to the end\n        if (this.platforms[0].y >= this.dimensions.height) {\n            this.platforms.shift();\n            const newY = this.platforms[1].y + CONSTANTS.MIN_PLAT_DIST;\n            this.platforms.push(this.pushNewPlat());\n        }\n    }\n\n    animate(ctx) {\n        this.drawBackground(ctx);\n        this.drawPlatforms(ctx);\n        this.drawBirds(ctx);\n        this.movePlats();\n        this.moveBirds();\n    }\n\n    drawBackground(ctx) {\n        ctx.fillStyle = \"white\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n\n        // ctx.drawImage(cloudSprite, 174, 2, 84, 27, this.x, this.y, 84, 27);\n    }\n\n    collidesWith(dino) {\n        //this function returns true if the the rectangles overlap\n        const _overlap = (plat, dino) => {\n            \n            //check that they don't overlap in the x axis\n            if(plat.x > dino.x + dino.width || plat.x + CONSTANTS.PLAT_WIDTH < dino.x) {\n                return false;\n            }\n\n            //check that they don't overlap in the y axis\n            if (dino.y + 60 > plat.y + CONSTANTS.PLAT_HEIGHT || dino.y + 60 < plat.y ) {\n                return false;\n            }\n\n            // if (plat.y > dino.y + dino.height && ) {\n            //     return false;\n            // }\n\n            return true;\n        };\n        let collision = false;\n\n        this.eachPlat((plat) => {\n            if (_overlap(plat, dino)) { \n                collision = true; \n            }\n        });\n\n        return collision;\n    }\n}\n\n//# sourceURL=webpack://trex_jump/./src/level.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;