/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Dino\n/* harmony export */ });\nconst CONSTANTS = {\n    DINO_WIDTH: 70,\n    DINO_HEIGHT: 72,\n    GRAVITY: 0.25,\n    TERMINAL_VEL: 10,\n    JUMP_SPEED: 12,\n    FRAME_X: 0,\n    FRAME_Y: 0\n};\n\nconst dinoSprite = new Image();\ndinoSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_sprite.png\";\n\nconst dinoLeftSprite = new Image();\ndinoLeftSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_left.png\";\n\nclass Dino {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = 205;\n        this.y = 450;\n        this.vel = 0;\n        this.width = CONSTANTS.DINO_WIDTH;\n        this.height = CONSTANTS.DINO_HEIGHT;\n        this.direction = \"\";\n    }\n\n    drawDino(ctx) { \n        // ctx.fillStyle = \"grey\";\n        // ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);\n        \n        if(this.direction===\"left\") {\n            ctx.drawImage(dinoLeftSprite, 411 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);\n        } else {\n            ctx.drawImage(dinoSprite, 1678 + (CONSTANTS.FRAME_X * 88), 6, 88, 94, this.x, this.y, 70, 75);\n        }\n    }\n\n    moveDino() {\n        //for each frame, the bird should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n        this.y += this.vel;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        this.vel += CONSTANTS.GRAVITY;\n        //we set a 'terminal velocity', a maximum speed the bird can travel\n        //this keeps the game from becoming too wild because the bird is moving too fast to control\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n    }\n\n    jump() {\n        //if this were a more realistic bird simulation, we would be adding to the velocity\n        //instead of just assigning it outright\n        //to make the experience more fun and 'bouncy' we just set it directly\n        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);\n    }\n\n    animate(ctx) {\n        this.moveDino();\n\n        this.drawDino(ctx);\n    }\n\n    controlDino(direction) {\n        let acc = 0;\n\n        if(direction==\"left\") {\n            this.direction=\"left\";\n            \n            acc = 9;\n\n            this.x -= acc;\n            CONSTANTS.FRAME_X += 1;\n            \n            if(CONSTANTS.FRAME_X == 4) {\n                CONSTANTS.FRAME_X = 0;\n            }\n        } \n\n        if(direction==\"right\") {\n            this.direction = \"right\";\n            acc = 9;\n\n            this.x += acc;\n            CONSTANTS.FRAME_X += 1;\n            if (CONSTANTS.FRAME_X == 4) {\n                CONSTANTS.FRAME_X = 0;\n            }\n        }\n    }\n\n    isOutOfBounds() {\n        if (this.y + CONSTANTS.DINO_HEIGHT > 640) {\n            return true;\n        };\n    };\n\n    // reduceGravity() {\n    //     this.vel += 0.002;\n    // }\n}\n\n\n//# sourceURL=webpack://trex_jump/./src/dino.js?");

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

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _dino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\n;\n\n\nconst CONSTANTS = {\n    SCORE_WIDTH: 20\n};\n\nconst scoreSprite = new Image();\nscoreSprite.src = \"/home/andrew/Desktop/dino_jump/img/dino_sprite.png\";\n\nconst topBorderSprite = new Image();\ntopBorderSprite.src = \"/home/andrew/Desktop/dino_jump/img/cactus.png\";\n\nclass Game {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.score = 0;\n        \n        this.scorePlaceValues = [\n            Math.floor(this.score % 10),\n            Math.floor(this.score / 10 % 10),\n            Math.floor(this.score / 100 % 10),\n            Math.floor(this.score / 1000 % 10),\n            Math.floor(this.score / 10000 % 10)\n        ];\n        \n        this.restart();\n    }\n\n    drawTopBorder(ctx) {\n        ctx.drawImage(\n            topBorderSprite,\n            1000, 2,  //sX, sY      lessen height to move line up\n            480, 24,  //           lessen this height after to shorten bottem\n            0, 0,\n            480, 24\n        )\n    }\n\n    bonusPoints() {\n        this.score += 1;\n    }\n\n    increaseDifficulty() {\n        this.level.cactus.push(this.level.newCactus());\n    }\n\n    updateScore() {\n        this.scorePlaceValues = [\n            Math.floor(this.score / 10000 % 10),\n            Math.floor(this.score / 1000 % 10),\n            Math.floor(this.score / 100 % 10),\n            Math.floor(this.score / 10 % 10),\n            Math.floor(this.score % 10)\n        ];\n    }\n\n\n    // CHANGEPLACEMENT \n    drawScore(ctx) {\n        for(let i = 0; i < 5; i++) {\n            ctx.drawImage(\n                scoreSprite, \n                1294 + (CONSTANTS.SCORE_WIDTH * this.scorePlaceValues[i]), 2,  //sX, sY\n                18, 21, \n                this.dimensions.width - (125) + (25 * i), 10, \n                18, 21\n            )\n        }\n    }\n\n    isGameOver() {\n        return (\n            this.dino.isOutOfBounds() || this.level.collidesWith(this.dino) === \"cactus\"\n        );\n        // this.level.deathFromBirdCheck(this.dino)\n    }\n\n    // CHANGEPLACEMENT\n    drawGameOver(ctx) {\n        ctx.drawImage(\n            scoreSprite,\n            1294,\n            29,\n            381,\n            21,\n            49.5,\n            100,\n            381,\n            21\n        );\n\n        ctx.drawImage(\n            scoreSprite,\n            2,\n            2,\n            72,\n            64,\n            204,\n            175,\n            72,\n            64\n        );\n    }\n    \n    animate() {\n        this.level.animate(this.ctx);\n        // this.drawTopBorder(this.ctx);\n        this.dino.animate(this.ctx);\n        this.drawScore(this.ctx);\n        this.score += 0.2;\n        if(this.level.bonus) {\n            this.bonusPoints();\n            this.level.bonus = false;\n        }\n        this.updateScore();\n        \n        \n        if (this.level.collidesWith(this.dino)) {\n            this.dino.jump();\n        }\n\n        if (this.isGameOver()) {\n            this.drawGameOver(this.ctx);\n            this.running = false;\n\n        }\n    \n        if (this.running) {\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n\n    restart() {\n        this.running = true;\n        this.score = 0;\n        \n        this.level = new _level__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n        this.dino = new _dino__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n        \n        this.animate();\n    }\n    \n    play() {\n        this.running = true;\n        this.animate();\n    }\n\n    registerEvents() {\n        this.boundClickHandler = this.input.bind(this);\n        document.addEventListener(\"keydown\", this.boundClickHandler);\n        document.addEventListener(\"keyup\", this.boundClickHandler);\n    }\n\n    input(event) {\n        let leftKey = event.keyCode === 65 || event.keyCode === 37; // A or Arrow_Left\n        let rightKey = event.keyCode === 68 || event.keyCode === 39; // D or Arrow_Right\n        let spaceKey = event.keyCode === 32 // Spacebar\n\n        if (leftKey) {\n            this.dino.controlDino(\"left\");\n        }\n        if (rightKey) {\n            this.dino.controlDino(\"right\");\n        }\n\n        if (event.type === \"keyup\" && ( leftKey || rightKey)) {\n            this.dino.controlDino(\"\")\n        }\n\n        if (this.running === false && spaceKey) {\n            this.restart();\n        }\n    }\n}\n\n//# sourceURL=webpack://trex_jump/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n;\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('game');\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n});\n\n//# sourceURL=webpack://trex_jump/./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements:  */
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (188:4)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n|     CHANGEPLACEMENT\\n>     newCactus() {\\n|         let randX = Math.floor(Math.random() * 443);\\n| \");\n\n//# sourceURL=webpack://trex_jump/./src/level.js?");

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