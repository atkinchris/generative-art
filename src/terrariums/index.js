import { drawBranch, drawLeaves } from './branch'
import { interpolate } from './geometry'

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

  const branches = [
    [
      [300, 200],
      [300, 150],
      [330, 100],
      [400, 70],
      [470, 100],
      [500, 200],
      [510, 320],
      [490, 400],
      [500, 500],
      [525, 525],
      [550, 550],
    ],
  ]

  branches
    .map(interpolate)
    .map(branch => drawBranch(ctx, branch))
    .map(branch => drawLeaves(ctx, branch))
}

setup()
draw()
