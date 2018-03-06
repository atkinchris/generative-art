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

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  drawLeaf(ctx, { x: 100, y: 100, scale: [1.0, 1.0, 1.0], rY: 0 })
  drawLeaf(ctx, { x: 300, y: 100, scale: [0.5, 0.5, 0.5], rY: 0 })
  drawLeaf(ctx, { x: 100, y: 300, scale: [1.0, 1.0, 1.0], rY: Math.PI / 3 })
  drawLeaf(ctx, { x: 300, y: 300, scale: [0.5, 0.5, 0.5], rY: Math.PI / 3 })

  ctx.fillStyle = 'black'
  ctx.fillRect(98, 98, 4, 4)
  ctx.fillRect(298, 98, 4, 4)
  ctx.fillRect(98, 298, 4, 4)
  ctx.fillRect(298, 298, 4, 4)
}

setup()
draw()
