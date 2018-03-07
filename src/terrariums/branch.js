import { midPoint, angleBetween } from './geometry'
import drawLeaf from './leaf'
import { randomBetween, randomAngle, randomOffshoot } from './random'

const drawBranch = (ctx, branch) => {
  ctx.beginPath()
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 4
  ctx.filter = 'blur(1px)'

  branch.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
    }

    const next = index !== branch.length - 1 ? branch[index + 1] : branch[index]
    const mid = midPoint(point, next)

    ctx.quadraticCurveTo(point[0], point[1], mid[0], mid[1])
    ctx.stroke()
  })

  ctx.closePath()

  return branch
}

const drawLeaves = (ctx, branch) => {
  branch.forEach((point) => {
    const scale = randomBetween(5, 7) / 10
    const direction = angleBetween([point[0], -1], point)
    const leaves = randomBetween(0, 2)

    for (let l = 0; l < leaves; l += 1) {
      drawLeaf(ctx, {
        x: point[0],
        y: point[1],
        rY: randomAngle(),
        rZ: randomOffshoot(direction - (Math.PI / 2)),
        scale: [scale, scale, 1],
      })
    }
  })

  return branch
}

const buildBranch = (startX, startY, angle, length) => {
  const segments = [
    [startX, startY],
  ]

  const g = 9.81
  const vX = 40
  const vY = 50
  let prevX

  for (let t = 0; t < length; t += 1) {
    const y = (vY * t * Math.sin(angle)) - (0.5 * g * (t ** 2))
    const x = y > 0
      ? vX * t * Math.cos(angle)
      : prevX + randomBetween(-15, 15)

    prevX = x

    segments.push([startX + x, startY - y])
  }

  return segments
}

export {
  drawBranch,
  drawLeaves,
  buildBranch,
}
