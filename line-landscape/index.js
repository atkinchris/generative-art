/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 96);
/******/ })
/************************************************************************/
/******/ ({

/***/ 96:
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const scale = 20
  const segmentWidth = 15

  const drawLine = (y) => {
    const yN = (y / height)
    p.push()

    // p.fill(yN * 255, 32, 255)
    // p.stroke(yN * 255, 128, 64)
    p.beginShape()

    const yOff = p.noise(0, y) * 10
    p.vertex(-1, height + 1)
    p.vertex(-1, y + yOff)

    if (p.noise(y * 0.1) < 0.5) {
      const point = p.random() * yN > 0.7
        ? p.curveVertex.bind(p)
        : p.vertex.bind(p)

      for (let x = 0; x <= width + segmentWidth; x += segmentWidth) {
        const offset = Math.abs(p.noise(x, y) * 15)
        point(x, y + offset + yOff)
      }
    }

    p.vertex(width + 1, y + yOff)
    p.vertex(width + 1, height + 1)
    p.endShape(p.CLOSE)

    p.pop()
  }


  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.BLEND)
    p.noLoop()
  }

  p.draw = () => {
    for (let y = 0; y < height; y += scale) {
      drawLine(y)
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });