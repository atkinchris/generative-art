const drawPot = (ctx, x, y, width, height) => {
  ctx.fillStyle = 'orange'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + width, y)
  ctx.lineTo(x + (width - 20), y + height)
  ctx.lineTo(x + 20, y + height)
  ctx.closePath()

  ctx.fill()

  return {
    left: x,
    right: x + width,
    top: y,
    bottom: y + height,
  }
}

export default drawPot
