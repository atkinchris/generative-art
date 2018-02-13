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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = Math.min(window.innerWidth, window.innerHeight) * 0.9
  const height = width
  const hours = 12
  const handLength = width / 40
  const hoursLength = handLength * 0.65
  const handWidth = handLength / 6
  const hoursWidth = hoursLength / 3
  const center = {
    x: width / 2,
    y: width / 2,
  }

  const drawFace = () => {
    p.push()
    p.fill('white')
    p.noStroke()
    p.ellipse(center.x, center.y, width)
    p.pop()
  }

  const drawNumber = (x, y, hour) => {
    const angle = hour * (p.TWO_PI / hours)
    p.push()
    p.translate(x, y)
    p.strokeWeight(handWidth)
    p.line(0, 0, 0, -handLength)
    p.rotate(angle)
    p.line(0, 0, hoursLength, 0)
    p.pop()
  }

  const drawNumbers = () => {
    const radius = (width / 2) - (handLength * 2)
    const angle = p.TWO_PI / hours
    let hour = 0

    for (let a = 0; a < p.TWO_PI; a += angle) {
      drawNumber(
        center.x + (Math.cos(a) * radius),
        center.y + (Math.sin(a) * radius),
        hour,
      )
      hour += 1
    }
  }

  const drawHand = (rotation, minutes) => {
    const unit = p.TWO_PI / (minutes ? 60 : hours)
    const angle = unit * rotation
    const length = minutes ? handLength : hoursLength

    p.push()
    p.strokeWeight(minutes ? handWidth * 5 : hoursWidth * 5)
    p.translate(center.x, center.y)
    p.rotate(angle)
    p.line(0, 20, 0, -length * 10)
    p.pop()
  }

  const drawHands = () => {
    const time = new Date()

    drawHand(time.getHours() % 12)
    drawHand(time.getMinutes(), true)

    p.fill('black')
    p.ellipse(center.x, center.y, handLength * 1.5)
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.noFill()
    p.strokeCap(p.PROJECT)
  }

  p.draw = () => {
    drawFace()
    drawNumbers()
    drawHands()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });