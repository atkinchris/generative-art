import { drawBranch, drawLeaves } from './branch'
import branches from './branches'
import drawPot from './pot'
import drawFrame from './frame'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1200
canvas.height = 1200

container.appendChild(canvas)

ctx.translate(300, 500)
ctx.filter = 'blur(1px)'

drawFrame(ctx, 320, 150)
branches.map(branch => drawBranch(ctx, branch))
const bounds = drawPot(ctx, 230, 150, 180, 150)
branches.map(branch => drawLeaves(ctx, branch, bounds))
