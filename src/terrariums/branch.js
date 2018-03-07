import { midPoint, angleBetween, isInside } from './geometry'
import drawLeaf from './leaf'
import { randomBetween, randomAngle } from './random'

const drawBranch = (ctx, branch) => {
  ctx.beginPath()
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 4

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

const drawLeaves = (ctx, branch, bounds) => {
  if (branch.length < 10) {
    const scale = randomBetween(5, 7) / 10
    drawLeaf(ctx, {
      x: branch[3][0],
      y: branch[3][1],
      rY: randomAngle(),
      rZ: randomAngle() - Math.PI,
      scale: [scale, scale, 1],
    })

    const point = branch[branch.length - 1]
    const direction = angleBetween([point[0], -1], point)

    drawLeaf(ctx, {
      x: point[0],
      y: point[1],
      rY: randomAngle(),
      rZ: direction - (Math.PI / 3.5),
      scale: [scale, scale, 1],
    })
    drawLeaf(ctx, {
      x: point[0],
      y: point[1],
      rY: randomAngle(),
      rZ: direction + (Math.PI / 3.5),
      scale: [scale, scale, 1],
    })

    return branch
  }

  branch.forEach((point) => {
    const scale = randomBetween(5, 7) / 10
    const direction = Math.atan2(point[0], point[1])
    const leaves = randomBetween(0, 2)

    for (let l = 0; l < leaves; l += 1) {
      if (!isInside(bounds, point)) {
        drawLeaf(ctx, {
          x: point[0],
          y: point[1],
          rY: randomAngle(),
          rZ: direction - ((Math.PI / 2) * l),
          scale: [scale, scale, 1],
        })
      }
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
  const vY = randomBetween(45, 55)
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
