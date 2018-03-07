const drawPot = (ctx, x, y, width, height) => {
  const left = x
  const right = x + width
  const top = y
  const bottom = y + height

  const offset = 40

  const midX = left + (width / 2)
  const midY = (bottom - (height / 2))

  ctx.fillStyle = 'orange'
  ctx.strokeStyle = 'rgba(16, 16, 16, 0.8)'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.moveTo(left, top)
  ctx.lineTo(right, top)
  ctx.quadraticCurveTo(right, midY, right - offset, bottom)
  ctx.lineTo(left + offset, bottom)
  ctx.quadraticCurveTo(left, midY, left, top)
  ctx.closePath()

  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(left + (offset / 4), midY)
  ctx.quadraticCurveTo(midX, midY + offset, right - (offset / 4), midY)

  ctx.stroke()

  return {
    left,
    right,
    top,
    bottom,
  }
}

export default drawPot
