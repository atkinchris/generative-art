import { drawBranch, drawLeaves } from './branch'
import { interpolate } from './geometry'
import branches from './branches'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const width = 600
const height = 600

container.appendChild(canvas)

const setup = () => {
  canvas.width = width
  canvas.height = height
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  branches
    .map(interpolate)
    .map(branch => drawBranch(ctx, branch))
    .map(branch => drawLeaves(ctx, branch))
}

setup()
draw()
