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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const buildField = (p, { width, height, scale = 20 }) => {
  const fieldStrength = 0.35
  const angleHeading = 270
  const angleScale = 0.5
  const noiseScale = 0.007

  const getVector = (x, y) => {
    const r = p.noise(x * noiseScale, y * noiseScale)
    const angle = p.radians((r * angleScale * 360) + (-45 + angleHeading))
    const vector = p5.Vector.fromAngle(angle)
    vector.setMag(fieldStrength)

    return vector
  }

  const drawVector = (vector, x, y) => {
    const length = 0.5 * scale
    p.push()

    p.stroke(50, 0.5)
    p.fill(50, 0.5)
    p.strokeWeight(length * 0.2)

    p.translate(x, y)
    p.rotate(vector.heading())
    p.line(0, 0, length, 0)
    p.triangle(
      length / 2,
      length * 0.2,
      length,
      0,
      length / 2,
      length * -0.2,
    )

    p.pop()
  }

  const draw = () => {
    for (let y = 0; y < height; y += scale) {
      for (let x = 0; x < width; x += scale) {
        const vector = getVector(x, y)
        drawVector(vector, x, y)
      }
    }
  }

  return {
    draw,
    getVector,
  }
}

/* harmony default export */ __webpack_exports__["a"] = (buildField);


/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MAX_VELOCITY = 2

class Particle {
  constructor(p, { x, y, life }) {
    this.p = p
    this.life = life
    this.position = p.createVector(x, y)
    this.acceleration = p.createVector(0, 0)
    this.velocity = p.createVector(0, 0)

    this.previousPosition = this.position
  }

  update(force) {
    this.previousPosition = this.p.createVector(
      this.position.x,
      this.position.y,
    )

    this.acceleration.add(force)
    this.velocity.add(this.acceleration)
    this.velocity.limit(MAX_VELOCITY)
    this.position.add(this.velocity)
    this.acceleration.mult(0)

    this.life -= 1
  }

  isDead() {
    return this.life <= 0
  }

  distanceFrom({ x, y }) {
    return Math.sqrt((
      ((x - this.position.x) ** 2) +
      ((y - this.position.y) ** 2)
    ))
  }

  draw() {
    const { p } = this

    p.push()
    p.stroke(0, 0.3)
    p.strokeWeight(1)
    p.line(
      this.previousPosition.x,
      this.previousPosition.y,
      this.position.x,
      this.position.y,
    )
    p.pop()
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Particle);


/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle__ = __webpack_require__(101);



const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const radius = 200
  const center = { x: width / 2, y: width / 2 }
  const particleLife = 10
  const particleCount = 10000
  const particleOrigin = {
    x: width * 0.5,
    y: height * 0.5,
  }

  const gaussian = value => Math.abs(p.randomGaussian()) * value

  const field = Object(__WEBPACK_IMPORTED_MODULE_0__field__["a" /* default */])(p, { width, height })
  let particles = Array.from({ length: particleCount }).map(() => (
    new __WEBPACK_IMPORTED_MODULE_1__particle__["a" /* default */](p, {
      x: gaussian(particleOrigin.x),
      y: height - gaussian(particleOrigin.y),
      life: p.randomGaussian(particleLife),
    })
  ))

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    // p.blendMode(p.MULTIPLY)
    // p.noLoop()
  }

  p.draw = () => {
    // field.draw()

    particles = particles.filter((particle) => {
      const { x, y } = particle.position
      const force = field.getVector(x, y)

      if (
        particle.distanceFrom(center) > radius ||
        particle.isDead()
      ) {
        return false
      }

      particle.update(force)
      particle.draw()
      return true
    })

    if (particles.length <= 0) {
      console.log('Stopping loop.')
      p.noLoop()
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new


/***/ })

/******/ });