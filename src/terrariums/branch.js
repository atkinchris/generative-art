import { midPoint, angleBetween } from './geometry'
import drawLeaf from './leaf'

const maxBetween = (min, max) => (Math.random() * (max - min)) + min
const randomAngle = () => Math.PI * (Math.random() - 0.5)
const randomOffshoot = (start) => {
  const angle = (Math.PI / 3) * Math.random()
  const direction = Math.random() - 0.5

  return direction > 0 ? start - angle : start + angle
}

const drawBranch = (ctx, branch) => {
  branch.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
    }

    if (index === branch.length - 1) {
      return
    }

    const next = branch[index + 1]
    const mid = midPoint(point, next)
    const direction = angleBetween([0, 0], point)
    const leaves = maxBetween(2, 4)

    ctx.strokeStyle = 'green'
    ctx.lineWidth = 4
    ctx.filter = 'blur(1px)'
    ctx.quadraticCurveTo(point[0], point[1], mid[0], mid[1])
    ctx.stroke()

    for (let l = 0; l < leaves; l += 1) {
      drawLeaf(ctx, {
        x: mid[0],
        y: mid[1],
        rY: randomAngle(),
        rZ: randomOffshoot(direction),
      })
    }
  })
}

export default drawBranch
