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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Dino\n/* harmony export */ });\nconst CONSTANTS = {\n    DINO_WIDTH: 40,\n    DINO_HEIGHT: 60,\n    GRAVITY: 0.3,\n    TERMINAL_VEL: 10,\n    JUMP_SPEED: 12,\n};\n\nclass Dino {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = this.dimensions.width / 3;\n        this.y = this.dimensions.height / 2;\n        this.vel = 0;\n    }\n\n    drawDino(ctx) {\n        ctx.fillStyle = \"grey\";\n        ctx.fillRect(this.x, this.y, CONSTANTS.DINO_WIDTH, CONSTANTS.DINO_HEIGHT);\n    }\n\n    moveDino() {\n        //for each frame, the bird should move by it's current velocity\n        //velocity is 'pixels per frame', so each frame it should update position by vel\n        this.y += this.vel;\n        //the acceleration of gravity is in pixels per second per second\n        //so each second, it changes the velocity by whatever the gravity constant is\n        this.vel += CONSTANTS.GRAVITY;\n        //we set a 'terminal velocity', a maximum speed the bird can travel\n        //this keeps the game from becoming too wild because the bird is moving too fast to control\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            //if the terminal velocity is exceeded, we set it to the terminal velicty\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n    }\n\n    jump() {\n        //if this were a more realistic bird simulation, we would be adding to the velocity\n        //instead of just assigning it outright\n        //to make the experience more fun and 'bouncy' we just set it directly\n        this.vel = -1 * (this.vel + CONSTANTS.JUMP_SPEED);\n    }\n\n    bounds() {\n        return {\n            left: this.x,\n            right: this.x + CONSTANTS.DINO_WIDTH,\n            top: this.y,\n            bottom: this.y + CONSTANTS.DINO_HEIGHT\n        }\n    }\n\n    animate(ctx) {\n        this.moveDino();\n        this.drawDino(ctx);\n    }\n}\n\n\n//# sourceURL=webpack://trex_jump/./src/dino.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _dino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\n;\n\n\nclass Game {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n    }\n    \n    animate() {\n        //first we move and draw the level\n        this.level.animate(this.ctx);\n        this.dino.animate(this.ctx);\n\n        if (this.level.collidesWith(this.dino)) {\n            this.dino.jump();\n        }\n    \n        if (this.running) {\n            //This calls this function again, after around 1/60th of a second\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n\n    restart() {\n        this.running = true;\n        \n        this.level = new _level__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n        this.dino = new _dino__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n        \n        this.animate();\n    }\n    \n    play() {\n        this.running = true;\n        this.animate();\n    }\n\n    registerEvents() {\n        this.boundClickHandler = this.click.bind(this);\n        this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n    }\n    \n    click(e) {\n        if (!this.running) {\n            this.play();\n        }\n        this.dino.jump();\n    }\n\n}\n\n//# sourceURL=webpack://trex_jump/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n;\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('game');\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n\n    // game.play();\n});\n\n//# sourceURL=webpack://trex_jump/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Level\n/* harmony export */ });\nconst CONSTANTS = {\n    PLAT_WIDTH: 100,\n    PLAT_HEIGHT: 10\n};\n\nclass Level {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        this.platforms = [ this.createPlat() ]\n    }\n\n    createPlat() {\n        const plat = {\n            dim: {\n                x: 125,\n                y: 500,\n                width: CONSTANTS.PLAT_WIDTH,\n                height: CONSTANTS.PLAT_HEIGHT\n            },\n\n            hitbox: {\n\n            }\n        }\n\n        return plat;\n    }\n\n    drawPlatforms(ctx) {\n        ctx.fillStyle = \"black\";\n\n        ctx.fillRect(\n            this.platforms[0].dim.x,\n            this.platforms[0].dim.y,\n            this.platforms[0].dim.width,\n            this.platforms[0].dim.height\n        );\n    }\n\n    // collidesWith(dino) {\n    //     //this function returns true if the the rectangles overlap\n    //     const _overlap = (plat, dino) => {\n    //         debugger\n    //         //check that they don't overlap in the x axis\n    //         if (plat.dim.x > dino.right || plat.dim.y < dino.left) {\n    //             return false;\n    //         }\n    //         //check that they don't overlap in the y axis\n    //         if (plat.dim.width > dino.bottom || plat.dim.height < dino.top) {\n    //             return false;\n    //         }\n    //         return true;\n    //     };\n    //     let collision = false;\n        \n    //     // this.eachPipe((pipe) => {\n    //         //check if the dino is overlapping (colliding) with either pipe\n\n    //     if (_overlap(this.platforms[0], dino) ) {\n    //         debugger \n    //         collision = true; \n    //     }\n\n    //     // });\n\n    //     return collision;\n    // }\n\n    animate(ctx) {\n        this.drawBackground(ctx);\n        this.drawPlatforms(ctx);\n    }\n\n    drawBackground(ctx) {\n        ctx.fillStyle = \"skyblue\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n    }\n\n    collidesWith(dino) {\n        //this function returns true if the the rectangles overlap\n        const _overlap = (plat, dino) => {\n            //check that they don't overlap in the x axis\n\n            // debugger\n            if(plat.dim.x > dino.x + 40 || plat.dim.x + 100 < dino.x) {\n                // debugger\n                return false;\n            }\n\n            //check that they don't overlap in the y axis\n            if (plat.dim.y > dino.y) {\n                // debugger\n                return false;\n            }\n            return true;\n        };\n        let collision = false;\n\n        // this.eachPipe((pipe) => {\n        //check if the dino is overlapping (colliding) with either pipe\n\n        if (_overlap(this.platforms[0], dino)) {\n            collision = true;\n        }\n\n        // });\n\n        return collision;\n    }\n}\n\n//# sourceURL=webpack://trex_jump/./src/level.js?");

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