import drawLeaf from './leaf'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const width = 400
const height = 400

container.appendChild(canvas)

const setup = () => {
  canvas.width = width
  canvas.height = height
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawLeaf(ctx, { x: 200, y: 100, rY: -0.5, rZ: 0.4 })
  drawLeaf(ctx, { x: 200, y: 100, rY: 1.0, rZ: -0.3 })
}

setup()
draw()
