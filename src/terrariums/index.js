import drawLeaf from './leaf'
import { midPoint, interpolate, angleBetween } from './geometry'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const width = 400
const height = 400

const maxBetween = (min, max) => (Math.random() * (max - min)) + min
const randomAngle = () => Math.PI * (Math.random() - 0.5)
const randomOffshoot = (start) => {
  const angle = (Math.PI / 3) * Math.random()
  const direction = Math.random() - 0.5

  return direction > 0 ? start - angle : start + angle
}

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

setup()
draw()
