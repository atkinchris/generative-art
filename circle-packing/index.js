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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

class Rect {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  contains(point) {
    const { x, y, width, height } = this

    return (
      (point.x - point.radius <= x + width && point.x + point.radius >= x) &&
      (point.y - point.radius <= y + height && point.y + point.radius >= y)
    )
  }
}

const distance = (a, b) => Math.sqrt((
  ((b.x - a.x) ** 2) + ((b.y - a.y) ** 2)
))

const sketch = (p) => {
  const width = 400
  const height = 400
  const circles = []
  const center = {
    x: width / 2,
    y: height / 2,
  }
  const canvasRadius = width / 2
  const groups = [
    { radius: 16, saturation: 0.1, max: 20 },
    { radius: 12, saturation: 0.4, max: 50 },
    { radius: 8, saturation: 0.6, max: 200 },
    { radius: 6, saturation: 0.2 },
  ]
  const DEFAULT_HUE = p.random(128, 196)
  const DEFAULT_BRIGHTNESS = 255

  const rects = [
    new Rect(120, 100, 50, 180),
    new Rect(120, 100, 160, 50),
    new Rect(120, 250, 160, 50),
  ]

  const packCircles = (config) => {
    const {
      radius,
      hue = DEFAULT_HUE,
      saturation,
      brightness = DEFAULT_BRIGHTNESS,
      max = Number.MAX_SAFE_INTEGER,
    } = config
    let retries = 20000
    let count = 0

    while (count < max && retries > 0) {
      const newCircle = {
        x: p.random(radius, width - radius),
        y: p.random(radius, height - radius),
        radius,
        hue,
        saturation,
        brightness,
      }
      const test = circle => distance(circle, newCircle) < (radius + circle.radius) / 2
      const withinCanvas = distance(center, newCircle) < canvasRadius - (radius / 2)
      const withinRect = rects.some(rect => rect.contains(newCircle))

      if (withinRect) {
        newCircle.hue -= 64
      }

      if (withinCanvas && !circles.some(test)) {
        circles.push(newCircle)
        count += 1
      } else {
        retries -= 1
      }
    }
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noStroke()
    p.noLoop()

    groups.forEach(packCircles)
  }

  p.draw = () => {
    circles.forEach((circle) => {
      p.fill(
        circle.hue,
        circle.saturation * 255,
        circle.brightness,
      )
      p.ellipse(circle.x, circle.y, circle.radius)
    })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })
/******/ ]);