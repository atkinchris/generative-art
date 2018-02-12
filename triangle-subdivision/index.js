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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const noiseScale = 0.001
  let stack = []

  const distance = points => Math.sqrt((
    ((points[2] - points[0]) ** 2) + ((points[3] - points[1]) ** 2)
  ))

  const subDivide = (points) => {
    if (distance(points) < width / 11) {
      stack.push(points)
      return false
    }

    const hLength = distance([points[0], points[1], points[2], points[3]])
    const hVector = p5.Vector.sub(
      p.createVector(points[2], points[3]),
      p.createVector(points[0], points[1]),
    ).normalize()
    hVector.setMag(Math.abs(p.randomGaussian(hLength / 6)))

    const lengthA = distance([points[0], points[1], points[4], points[5]])
    const lengthB = distance([points[2], points[3], points[4], points[5]])
    const midPoint = p.createVector(
      (points[0] + points[2]) / 2,
      (points[1] + points[3]) / 2,
    )

    if (lengthA === lengthB) {
      hVector.mult(p.randomGaussian())
    }

    if (lengthA < lengthB) {
      midPoint.sub(hVector)
    } else {
      midPoint.add(hVector)
    }

    stack.push([
      points[4], points[5],
      points[0], points[1],
      midPoint.x, midPoint.y,
    ])

    stack.push([
      points[4], points[5],
      points[2], points[3],
      midPoint.x, midPoint.y,
    ])

    return true
  }

  const drawTriangle = (points) => {
    const hue = (p.noise(
      points[0] * noiseScale,
      points[1] * noiseScale,
    ) * 127) + 127

    p.fill(hue, 128, 128)
    p.stroke('white')
    p.strokeWeight(2)
    p.beginShape()
    p.vertex(points[0], points[1])
    p.vertex(points[2], points[3])
    p.vertex(points[4], points[5])
    p.endShape(p.CLOSE)
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noStroke()
    p.noFill()

    stack.push([0, 0, width, height, width, 0])
    stack.push([0, 0, width, height, 0, height])

    let result = true

    while (result) {
      result = subDivide(stack.shift())
    }

    stack = stack.sort(() => p.random(-1, 1))
  }

  p.draw = () => {
    // stack.forEach(drawTriangle)
    drawTriangle(stack.shift())
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });