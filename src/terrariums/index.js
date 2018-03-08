import { drawBranch, drawLeaves } from './branch'
import branches from './branches'
import drawPot from './pot'
import drawFrame from './frame'
import applyTexture from './texture'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 600
canvas.height = 2000

container.appendChild(canvas)

ctx.translate(0, 1000)

drawFrame(ctx, 320, 150)
branches.map(branch => drawBranch(ctx, branch))
const bounds = drawPot(ctx, 240, 150, 160, 130)
branches.map(branch => drawLeaves(ctx, branch, bounds))
applyTexture(ctx)
