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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 35:
/***/ (function(module, exports) {

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const rPolygon = (x, y, radius, nsides) => {
    const points = []
    const angle = p.TWO_PI / nsides

    for (let a = 0; a < p.TWO_PI; a += angle) {
      points.push({
        x: x + (Math.cos(a) * radius),
        y: y + (Math.sin(a) * radius),
        z: p.random(-1, 1),
      })
    }

    return points
  }

  const moveNearby = (point, deviation) => ({
    x: p.randomGaussian(point.x, point.z * deviation),
    y: p.randomGaussian(point.y, point.z * deviation),
    z: point.z,
  })

  const deform = (points, deviation) => points.map(point => moveNearby(point, deviation))

  const interpolate = (points, iterations = 1) => {
    const newPoints = []

    for (let iteration = 0; iteration < iterations; iteration += 1) {
      for (let i = 0; i < points.length; i += 1) {
        const p1 = points[i]
        const p2 = points[(i + 1) % points.length]
        const pMid = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
          z: ((p1.z + p2.z) / 2) * 0.55 * p.random(0.5, 2.5),
        }

        newPoints.push(p1)
        newPoints.push(pMid)
      }
    }

    return newPoints
  }

  const drawPoly = (points) => {
    p.beginShape()
    points.forEach(v => p.vertex(v.x, v.y))
    p.endShape(p.CLOSE)
  }

  const drawDeformedPoly = (radius, offset, colour) => {
    const randomRadius = p.randomGaussian(radius, radius / 10)
    const baseShape = rPolygon(0, 0, randomRadius, 10)
    let polygon = baseShape

    const fill = p.color(colour)
    fill.setAlpha(0.04)
    p.fill(fill)

    p.translate(p.width / 2, p.height / 2)
    p.translate(offset.x, offset.y)

    const iterations = 3
    for (let iteration = 0; iteration < iterations; iteration += 1) {
      polygon = interpolate(polygon)
      polygon = deform(polygon, 5)
    }

    const layers = 30
    const deformations = 5
    for (let layer = 0; layer < layers; layer += 1) {
      let current = polygon
      for (let deformation = 0; deformation < deformations; deformation += 1) {
        current = deform(current, 8)
      }
      drawPoly(current)
    }

    p.resetMatrix()
  }


  p.setup = () => {
    p.createCanvas(400, 400)
    p.noStroke()
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
  }

  p.draw = () => {
    const radius = 100
    const offset = radius * 0.4

    drawDeformedPoly(radius, { x: -offset, y: 0 }, '#E0F9B5')
    drawDeformedPoly(radius, { x: offset, y: 0 }, '#A5DEE5')
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });