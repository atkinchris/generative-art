import drawBranch from './branch'
import { interpolate } from './geometry'

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

  const branch = interpolate([
    [25, 25],
    [90, 120],
    [200, 200],
    [300, 320],
    [350, 350],
  ])

  drawBranch(ctx, branch)
}

setup()
draw()
