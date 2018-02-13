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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400

  const rPolygon = (center, radius, nsides) => {
    const points = []
    const angle = p.TWO_PI / nsides

    for (let a = 0; a < p.TWO_PI; a += angle) {
      points.push({
        x: center.x + (Math.cos(a) * p.randomGaussian(radius, 2)),
        y: center.y + (Math.sin(a) * p.randomGaussian(radius, 2)),
      })
    }

    return points
  }

  const drawSegments = (inner, outer) => {
    for (let i = 0; i < outer.length; i += 1) {
      const points = [
        outer[i],
        outer[(i + 1) % outer.length],
        inner[(i + 1) % inner.length],
        inner[i],
      ]

      p.fill(p.random(127, 196), 64, 128)
      p.beginShape()
      points.forEach(point => p.vertex(point.x, point.y))
      p.endShape(p.CLOSE)
    }
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noLoop()
  }

  p.draw = () => {
    const circles = []
    for (let i = 100; i < width * 0.5; i += 15) {
      const offsetCenter = {
        x: p.randomGaussian(width / 2, 2),
        y: p.randomGaussian(height / 2, 2),
      }

      circles.push(rPolygon(offsetCenter, i, 30))
    }

    for (let c = 1; c < circles.length; c += 1) {
      drawSegments(circles[c - 1], circles[c])
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });