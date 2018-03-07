import { midPoint, angleBetween } from './geometry'
import drawLeaf from './leaf'

const maxBetween = (min, max) => (Math.random() * (max - min)) + min
const randomAngle = () => Math.PI * (Math.random() - 0.5)
const randomOffshoot = (start) => {
  const angle = (Math.PI / 2) * Math.random()
  const direction = Math.random() - 0.5

  return direction < 0 ? start - angle : start + angle
}

const drawBranch = (ctx, branch) => {
  ctx.beginPath()
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 4
  ctx.filter = 'blur(1px)'

  branch.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
    }

    if (index === branch.length - 1) {
      return
    }

    const next = branch[index + 1]
    const mid = midPoint(point, next)

    ctx.quadraticCurveTo(point[0], point[1], mid[0], mid[1])
    ctx.stroke()
  })

  ctx.closePath()

  return branch
}

const drawLeaves = (ctx, branch) => {
  branch.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
      return
    }

    if (index === branch.length - 1) {
      return
    }

    const scaleModifier = branch.length > 15 ? 1 : branch.length / 15

    const scale = scaleModifier - (index / (branch.length * 2))
    const next = branch[index + 1]
    const mid = midPoint(point, next)
    const direction = angleBetween([0, 1], mid)
    const leaves = maxBetween(2, 4)

    for (let l = 0; l < leaves; l += 1) {
      drawLeaf(ctx, {
        x: mid[0],
        y: mid[1],
        rY: randomAngle(),
        rZ: randomOffshoot(direction),
        scale: [scale, scale, 1],
      })
    }
  })

  return branch
}

export {
  drawBranch,
  drawLeaves,
}
