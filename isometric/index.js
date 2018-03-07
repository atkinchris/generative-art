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
/******/ 	return __webpack_require__(__webpack_require__.s = 112);
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isoCube__ = __webpack_require__(113);


const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
canvas.width = 512
canvas.height = 512
container.appendChild(canvas)

const palette = [
  '#384259',
  '#F73859',
  '#7AC7C4',
  '#C4EDDE',
]
const getRColour = () => palette[Math.floor(Math.random() * palette.length)]

const sketch = () => {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const size = Math.floor(width / 16)
  const grid = []
  const depth = 5
  const curve = 4

  const rowHeight = size
  const columnWidth = Math.sqrt((size ** 2) - ((size / 2) ** 2))
  const curveWidth = columnWidth * 2 * (curve + 1)
  // const planes = Math.ceil(height / (rowHeight * 2))

  for (let y = 0; y <= height + (rowHeight * 2); y += rowHeight * 2) {
    const plane = y / (rowHeight * 2)

    for (let x = width; x >= -curveWidth; x -= curveWidth) {
      for (let z = depth; z >= 0; z -= 1) {
        const yOffset = y - (z * rowHeight)
        grid.push({
          x: x - columnWidth,
          y: yOffset - (rowHeight * 0.5),
          z,
          plane,
        })

        for (let c = 0; c < curve; c += 1) {
          grid.push({
            x: x + (columnWidth * (0 + c)),
            y: yOffset + (rowHeight * 0.5 * c),
            z,
            plane,
          })
          grid.push({
            x: x + (columnWidth * ((curve * 2) - c)),
            y: yOffset + (rowHeight * 0.5 * c),
            z,
            plane,
          })
        }

        grid.push({
          x: x + (columnWidth * curve),
          y: yOffset + (rowHeight * 0.5 * curve),
          z,
          plane,
        })
      }
    }
  }

  const depthSort = (a, b) => {
    if (a.plane === b.plane) {
      if (a.y < b.y) {
        return -1
      }

      if (a.y > b.y) {
        return 1
      }

      return 0
    }

    if (a.plane > b.plane) {
      return -1
    }

    if (a.plane < b.plane) {
      return 1
    }

    return 0
  }

  const depthFilter = ({ z }) => {
    if (z === 0) {
      return Math.random() > 0.25
    }

    return true
  }

  grid
    .sort(depthSort)
    .filter(depthFilter)
    .map(cube => Object.assign({}, cube, {
      size,
      colour: getRColour(),
    }))
    .forEach(cube => Object(__WEBPACK_IMPORTED_MODULE_0__isoCube__["a" /* default */])(ctx, cube))
}

sketch()


/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const radians = degrees => degrees * (Math.PI / 180)

const drawIsoCube = (ctx, { x, y, size, angle = 30, colour = 'white' }) => {
  const a = radians(angle)
  const dX = size * Math.cos(a)
  const dY = size * Math.sin(a)

  const moveTo = (rX, rY) => ctx.moveTo(x + rX, y + rY)
  const lineTo = (rX, rY) => ctx.lineTo(x + rX, y + rY)

  const fillSolid = () => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = colour
    ctx.fill()
  }

  const fillShadow = (x1, y1, x2, y2, a1, a2) => {
    const gradient = ctx.createLinearGradient(x + x1, y + y1, x + x2, y + y2)
    gradient.addColorStop(0, `rgba(${a1}, ${a1}, ${a1}, 0.75)`)
    gradient.addColorStop(1, `rgba(${a2}, ${a2}, ${a2}, 0.75)`)
    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const stroke = () => {
    ctx.globalCompositeOperation = 'lighten'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.stroke()
  }

  const rFace = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(dX, dY)
    lineTo(dX, dY - size)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, dX, dY, 255, 196)
    stroke()
  }

  const lFace = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(-dX, dY)
    lineTo(-dX, dY - size)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, -dX, dY, 222, 64)
    stroke()
  }

  const top = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(dX, -dY)
    lineTo(0, -size)
    lineTo(-dX, -dY)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, 0, -size, 255, 127)
    stroke()
  }

  lFace()
  rFace()
  top()
}

/* harmony default export */ __webpack_exports__["a"] = (drawIsoCube);


/***/ })

/******/ });