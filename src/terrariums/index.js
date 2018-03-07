import { drawBranch, drawLeaves } from './branch'
import branches from './branches'
import drawPot from './pot'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600

container.appendChild(canvas)

branches.map(branch => drawBranch(ctx, branch))
const bounds = drawPot(ctx, 220, 150, 200, 150)
branches.map(branch => drawLeaves(ctx, branch, bounds))
