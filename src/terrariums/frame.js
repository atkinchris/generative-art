const drawFrame = (ctx, x, y) => {
  const base = [x, y + 250]
  const top = [x, y - 500]

  ctx.moveTo(base[0], base[1])
  ctx.lineTo(x - 160, y + 100)
  ctx.lineTo(top[0], top[1])

  ctx.moveTo(base[0], base[1])
  ctx.lineTo(x + 160, y + 100)
  ctx.lineTo(top[0], top[1])

  ctx.moveTo(base[0], base[1])
  ctx.lineTo(x + 60, y + 100)
  ctx.lineTo(top[0], top[1])

  ctx.moveTo(base[0], base[1])
  ctx.lineTo(x - 70, y + 70)
  ctx.lineTo(x - 80, y + 70)
  ctx.lineTo(top[0], top[1])

  ctx.moveTo(x - 160, y + 100)
  ctx.lineTo(x, y + 50)
  ctx.lineTo(x + 160, y + 100)

  ctx.moveTo(top[0], top[1])
  ctx.ellipse(top[0], top[1] - 5, 10, 10, 0, Math.PI / 2, 4 * Math.PI)

  ctx.moveTo(top[0], top[1] - 10)
  ctx.lineTo(top[0], -1000)

  ctx.strokeStyle = 'rgba(16, 16, 16, 0.8)'
  ctx.lineWidth = 4
  ctx.stroke()
}

export default drawFrame
