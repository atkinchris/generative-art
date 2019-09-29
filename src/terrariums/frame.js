import { interpolate, deform } from './geometry'

const drawFrame = (ctx, x, y) => {
  const base = [x, y + 250]
  const top = [x, y - 500]

  const lines = [
    [[base[0], base[1]], [x - 160, y + 100], [top[0], top[1]]],
    [[base[0], base[1]], [x + 160, y + 100], [top[0], top[1]]],
    [[base[0], base[1]], [x + 40, y + 100], [top[0], top[1]]],
    [[base[0], base[1]], [x - 40, y + 100], [top[0], top[1]]],
    [[x - 160, y + 100], [x, y + 50], [x + 160, y + 100]],
    [[top[0], top[1] - 10], [top[0], -1000]],
  ]

  let interpolated = lines

  for (let i = 0; i < 6; i += 1) {
    interpolated = interpolated.map(line => interpolate(line))
  }

  interpolated
    .map(line => deform(line, 3))
    .forEach(points =>
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point[0], point[1])
        } else {
          ctx.lineTo(point[0], point[1])
        }
      })
    )

  ctx.moveTo(top[0], top[1])
  ctx.ellipse(top[0], top[1] - 5, 10, 10, 0, Math.PI / 2, 4 * Math.PI)

  ctx.strokeStyle = 'rgba(16, 16, 16, 0.8)'
  ctx.lineWidth = 4
  ctx.stroke()
}

export default drawFrame
