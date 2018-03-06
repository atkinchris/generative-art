import drawLeaf from './leaf'
import { midPoint, interpolate } from './geometry'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const width = 400
const height = 400

const randomAngle = () => Math.PI * (Math.random() - 0.5)
const randomOffshoot = direction => ((Math.PI / 3) * Math.random()) - ((Math.PI / 6) * direction)

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

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  branch.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
    }

    if (index === branch.length - 1) {
      return
    }

    const next = branch[index + 1]
    const mid = midPoint(point, next)

    ctx.strokeStyle = 'green'
    ctx.lineWidth = 4
    ctx.filter = 'blur(1px)'
    ctx.quadraticCurveTo(point[0], point[1], mid[0], mid[1])
    ctx.lineTo(mid[0] + 5, mid[1] + 5)
    ctx.stroke()

    drawLeaf(ctx, { x: mid[0], y: mid[1], rY: randomAngle(), rZ: randomOffshoot(1) })
    drawLeaf(ctx, { x: mid[0], y: mid[1], rY: randomAngle(), rZ: randomOffshoot(-1) })
    drawLeaf(ctx, { x: mid[0] + 5, y: mid[1] + 5, rY: randomAngle(), rZ: randomOffshoot(-1) })
  })
}

setup()
draw()
